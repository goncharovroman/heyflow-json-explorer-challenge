export type JSONValue = string | number | boolean | JSONObject | JSONArray | null

type JSONObject = {
  [x: string]: JSONValue
}

type JSONArray = Array<JSONValue>