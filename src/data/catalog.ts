import salesJson from "./sales.json";
import kardexJson from "./kardex.json";
import type { KardexProduct, Sale } from "@/lib/types";

export const SALES = salesJson as Sale[];
export const KARDEX = kardexJson as KardexProduct[];
