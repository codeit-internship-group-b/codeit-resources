import { MEMBER_FORM_MESSAGES } from "@repo/constants/messages";
import MultiSelectDropdown from "@ui/src/components/common/Dropdown/MulitiSelectDropdown";
import { useTeamsQuery } from "@/app/admin/teams/_hooks/useTeams";

interface TeamDropdownProps {
  value: string[];
  onSelect: () => void;
}

export default function TeamDropdown({ onSelect, value }: TeamDropdownProps): JSX.Element {
  const { data: teams } = useTeamsQuery();

  return (
    <MultiSelectDropdown selectedValue={value} onSelect={onSelect}>
      <MultiSelectDropdown.Toggle>
        {value.length > 0 ? value.join(", ") : MEMBER_FORM_MESSAGES.PLACEHOLDER.TEAM}
      </MultiSelectDropdown.Toggle>
      <MultiSelectDropdown.Wrapper>
        {teams?.map(({ name }) => (
          <MultiSelectDropdown.Item key={name} value={name}>
            {name}
          </MultiSelectDropdown.Item>
        ))}
      </MultiSelectDropdown.Wrapper>
    </MultiSelectDropdown>
  );
}
