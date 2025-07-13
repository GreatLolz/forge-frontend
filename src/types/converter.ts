type OptionType = "boolean" | "number" | "range" | "enum" | "string";

interface BaseOption {
  label: string;
  type: OptionType;
  default?: any;
  description?: string;
  required?: boolean;
}

interface BooleanOption extends BaseOption {
  type: "boolean";
  default?: boolean;
}

interface NumberOption extends BaseOption {
  type: "number";
  min?: number;
  max?: number;
  default?: number;
}

interface RangeOption extends BaseOption {
  type: "range";
  min: number;
  max: number;
  default?: number;
}

interface EnumOption extends BaseOption {
  type: "enum";
  values: string[];
  default?: string;
}

interface StringOption extends BaseOption {
  type: "string";
  default?: string;
}

type ConverterOption =
  | BooleanOption
  | NumberOption
  | RangeOption
  | EnumOption
  | StringOption;

type ConverterOptions = Record<string, ConverterOption>;

interface ConverterType {
  options: ConverterOptions;
}

type ConverterTypes = Record<string, ConverterType>;