import { QueryFunc } from "@/server/define.ts";
import { encodeHex } from "jsr:@std/encoding@1/hex";
import { parseXmlStream, type XmlEventCallbacks } from "@std/xml";
import { parseDate } from "./date.ts";
