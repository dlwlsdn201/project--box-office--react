import styled from 'styled-components';
import { DatePickerInput } from '@mantine/dates';
import { COLOR } from '../../lib/palette';
import { useDatePicker } from './hooks/useDatePicker';
import { CalendarIcon } from '../../shared/assets/icons';

const DatePickerContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 10rem;
`;

const StyledDatePicker = styled(DatePickerInput)`
  background-color: ${COLOR.sectionColor};
  border-radius: 0.25rem;
`;

interface Props {
  useDatePicker: ReturnType<typeof useDatePicker>;
}

const DateFilter = ({ useDatePicker }: Props) => {
  const { date, updateDate } = useDatePicker;
  const maximumDate = new Date();
  maximumDate.setDate(maximumDate.getDate() - 1); // 어제 날짜로 설정
  return (
    <DatePickerContainer>
      <StyledDatePicker
        rightSection={<CalendarIcon />}
        value={date as Date}
        maxDate={maximumDate}
        valueFormat="YYYY.MM.DD"
        onChange={updateDate}
      />
    </DatePickerContainer>
  );
};

export default DateFilter;