import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterValue } from "@/types";

interface FilterSelectProps {
  label: string;
  value: FilterValue;
  options: string[];
  onChange: (value: FilterValue) => void;
  disabled?: boolean;
}

export const FilterSelect = ({
  label,
  value,
  options,
  onChange,
  disabled = false,
}: FilterSelectProps) => {
  return (
    <Select
      value={value || "all"}
      onValueChange={(val) => onChange(val === "all" ? null : val)}
      disabled={disabled || options.length === 0}
    >
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label}`}>
          {value || `All ${label}s (${options.length})`}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          All {label}s ({options.length})
        </SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
