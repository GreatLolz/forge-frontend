type OptionType = "boolean" | "number" | "range" | "enum" | "string";

interface BaseOption {
  label: string;
  type: OptionType;
  default?: any;
  description?: string;
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
    label: string;
    options: ConverterOptions;
}

type ConverterTypes = Record<string, ConverterType>;

export const CONVERTER_TYPES: ConverterTypes = {
    "trace": {
        label: "Eval trace log",
        options: {
            "select_sample_count": {
                label: "Select sample count",
                type: "number",
                default: 100,
                description: "Number of samples to be selected from the dataset",
            },
            "human_to_ai_ratio": {
                label: "Human to AI ratio",
                type: "range",
                min: 0,
                max: 1,
                default: 0.3,
                description: "The percentage of the selected samples that should be sent to human reviewers",
            },
            "keep_model_responses": {
                label: "Keep model responses",
                type: "boolean",
                default: false,
            },
            "commit_id": {
                label: "Commit ID",
                type: "string",
                default: "Initial commit",
                description: "ID of the first commit created for this dataset"
            }
        }
    }
}