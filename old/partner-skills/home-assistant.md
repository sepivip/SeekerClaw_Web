---
name: homeassistant
description: "Control and monitor smart home via Home Assistant — lights, climate, fan, vacuum, alarm, media, scenes, automations, presence. Use when user asks about smart home devices, room temperature, who's home, or wants to toggle/control anything at home."
version: "1.0.0"
emoji: "🏠"
image: "https://seekerclaw.xyz/assets/partner-skills/homeassistant.jpg"
requires:
  env: []
  config: ["homeassistant_token", "homeassistant_url"]
allowed-tools:
  - js_eval
---

# Home Assistant

Control and monitor the Home Assistant instance. Auth token and URL are stored in `agent_settings.json` under `apiKeys.homeassistant_token` and `apiKeys.homeassistant_url`.

## haRequest Helper

Use this for ALL Home Assistant API calls. Never hardcode the token or URL.

```js
const haRequest = (method, path, body) => new Promise((resolve, reject) => {
  const http = require("http");
  const fs = require("fs");
  const settings = JSON.parse(fs.readFileSync(__dirname + "/agent_settings.json", "utf8"));
  const token = settings.apiKeys.homeassistant_token;
  const urlStr = settings.apiKeys.homeassistant_url || "http://homeassistant.local:8123";
  const url = new URL(urlStr);
  const data = body ? JSON.stringify(body) : null;
  const req = http.request({
    hostname: url.hostname,
    port: url.port || 8123,
    path: path,
    method: method,
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
      ...(data ? { "Content-Length": Buffer.byteLength(data) } : {})
    }
  }, (res) => {
    let d = "";
    res.on("data", chunk => d += chunk);
    res.on("end", () => {
      try { resolve({ status: res.statusCode, data: JSON.parse(d) }); }
      catch { resolve({ status: res.statusCode, data: d }); }
    });
  });
  req.setTimeout(8000, () => { req.destroy(); reject(new Error("HA request timeout — is the phone on home WiFi?")); });
  req.on("error", reject);
  if (data) req.write(data);
  req.end();
});
```

## Known Entities

### Lights
| Friendly Name | Entity ID |
|---|---|
| Front Yard | `light.batcave_frontyard_switch_1` |
| Gaming Light (Bulb) | `light.yeelink_color5_22e1_light` |

### Switches
| Friendly Name | Entity ID |
|---|---|
| MINIR4 | `switch.sonoff_1002668196_1` |
| Front Yard | `switch.batcave_frontyard_switch_1` |
| BackYard | `switch.batcave_backyard_switch_1` |
| Fan Oscillation | `switch.dmaker_p18_5280_horizontal_swing` |

### Climate
| Entity ID | Modes |
|---|---|
| `climate.living_room` | heat, cool, off, fan_only |

### Fan
| Entity ID | Notes |
|---|---|
| `fan.dmaker_p18_5280_fan` | Mi Smart Standing Fan 2, supports speed % |

### Vacuum
| Entity ID | Commands |
|---|---|
| `vacuum.dreame_p2114a_0add_robot_cleaner` | start, stop, return_to_base, pause |

### Alarm
| Entity ID | Notes |
|---|---|
| `alarm_control_panel.blink_batcave` | Blink camera alarm |

### Media Players
| Friendly Name | Entity ID |
|---|---|
| Living Room Speaker | `media_player.living_room_speaker` |
| Home TV | `media_player.home_tv` |

### Scenes
| Friendly Name | Entity ID |
|---|---|
| Turn on all switches | `scene.turn_on_all_switches` |
| Outdoor off | `scene.outdoor_off` |
| Outdoor on | `scene.outdoor_on` |

### Automations
| Friendly Name | Entity ID |
|---|---|
| Wind Speed Alert | `automation.wind_alert_15_m_s` |
| Gaming Light (Garmin) | `automation.turn_on_gaming_light_when_garmin_detected_and_dark` |
| Gaming Light (BLE+WiFi) | `automation.new_automation` |

### Presence
| Entity ID | Notes |
|---|---|
| `person.beka` | State: `home` or `not_home` |
| `device_tracker.garmin_watch` | Garmin watch tracker |

## API Patterns

### Get entity state
```js
const r = await haRequest("GET", "/api/states/{entity_id}");
```

### Control a device
```js
await haRequest("POST", "/api/services/{domain}/{service}", { entity_id: "..." });
```

### Common calls

**Lights/switches on/off:**
```js
await haRequest("POST", "/api/services/light/turn_on", { entity_id: "light.batcave_frontyard_switch_1" });
await haRequest("POST", "/api/services/light/turn_off", { entity_id: "light.batcave_frontyard_switch_1" });
```

**Light color/brightness:**
```js
await haRequest("POST", "/api/services/light/turn_on", {
  entity_id: "light.yeelink_color5_22e1_light",
  brightness_pct: 80,
  rgb_color: [255, 100, 0],
  color_temp: 3000
});
```

**Climate:**
```js
await haRequest("POST", "/api/services/climate/set_temperature", {
  entity_id: "climate.living_room", temperature: 22
});
await haRequest("POST", "/api/services/climate/set_hvac_mode", {
  entity_id: "climate.living_room", hvac_mode: "heat"
});
```

**Fan:**
```js
await haRequest("POST", "/api/services/fan/turn_on", { entity_id: "fan.dmaker_p18_5280_fan" });
await haRequest("POST", "/api/services/fan/set_percentage", { entity_id: "fan.dmaker_p18_5280_fan", percentage: 50 });
```

**Vacuum:**
```js
await haRequest("POST", "/api/services/vacuum/start", { entity_id: "vacuum.dreame_p2114a_0add_robot_cleaner" });
await haRequest("POST", "/api/services/vacuum/return_to_base", { entity_id: "vacuum.dreame_p2114a_0add_robot_cleaner" });
```

**Alarm:**
```js
await haRequest("POST", "/api/services/alarm_control_panel/alarm_arm_away", { entity_id: "alarm_control_panel.blink_batcave" });
await haRequest("POST", "/api/services/alarm_control_panel/alarm_disarm", { entity_id: "alarm_control_panel.blink_batcave" });
```

**Scenes:**
```js
await haRequest("POST", "/api/services/scene/turn_on", { entity_id: "scene.outdoor_on" });
```

**Automations:**
```js
await haRequest("POST", "/api/services/automation/trigger", { entity_id: "automation.wind_alert_15_m_s" });
```

**Media player:**
```js
await haRequest("POST", "/api/services/media_player/turn_on", { entity_id: "media_player.living_room_speaker" });
await haRequest("POST", "/api/services/media_player/volume_set", { entity_id: "media_player.living_room_speaker", volume_level: 0.5 });
```

## Behavior Rules

1. **Always use haRequest** — never hardcode token or URL.
2. **Status queries** → `GET /api/states/{entity_id}` or filter from `GET /api/states`.
3. **Control actions** → `POST /api/services/{domain}/{service}`.
4. If entity is `unavailable`, report it clearly — device is likely offline or powered off.
5. **No confirmation needed** for simple toggles (lights, fan, scenes) — just do it and confirm.
6. **Ask confirmation** before: arming/disarming alarm, starting vacuum, changing thermostat by more than 3°C.

## Temperature Queries

Fetch `climate.living_room` for the real indoor reading:
```js
const r = await haRequest("GET", "/api/states/climate.living_room");
const current = r.data.attributes.current_temperature;
const target = r.data.attributes.temperature;
const mode = r.data.state;
```
For a full overview, fetch `/api/states` and filter by `unit_of_measurement === "°C"`. Group as **indoors** vs **outdoors**. Camera temps are chip temps — label them as such.

## Presence Queries
```js
const r = await haRequest("GET", "/api/states/person.beka");
const isHome = r.data.state === "home";
```

## Entity Matching

Map vague user input to the right entity:
- "living room light" / "gaming light" → `light.yeelink_color5_22e1_light`
- "front yard" / "outdoor lights" / "porch light" → `light.batcave_frontyard_switch_1` or `scene.outdoor_on/off`
- "fan" → `fan.dmaker_p18_5280_fan`
- "vacuum" / "robot" / "robo" → `vacuum.dreame_p2114a_0add_robot_cleaner`
- "thermostat" / "ac" / "heating" / "temperature" → `climate.living_room`
- "alarm" → `alarm_control_panel.blink_batcave`
- "speaker" → `media_player.living_room_speaker`
- "tv" → `media_player.home_tv`
- "all outdoor lights on/off" → `scene.outdoor_on` / `scene.outdoor_off`

## Error Handling

- **401** → token expired, tell user to regenerate in HA Settings > Long-Lived Access Tokens
- **404** → entity not found, check entity_id spelling
- **Timeout** → HA unreachable, check if phone is on home WiFi
- **`unavailable`** → device offline, report clearly
