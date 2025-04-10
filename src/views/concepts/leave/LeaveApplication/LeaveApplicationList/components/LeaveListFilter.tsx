import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { components } from 'react-select'
import type { ControlProps, OptionProps } from 'react-select'

import { useLeaveApplicationListStore } from '../store/leaveApplicationStore'

const { Control } = components

type StatusOption = {
  label: string
  value: string
  dotBackground: string
}

const statusOptions = [
  { label: 'All Status', value: '', dotBackground: 'bg-gray-200' },
  { label: 'Pending', value: 'Pending', dotBackground: 'bg-success' },
  { label: 'Approved', value: 'Approved', dotBackground: 'bg-error' },
  { label: 'Cancelled', value: 'Cancelled', dotBackground: 'bg-error' },

]

const StatusSelectOption = (props: OptionProps<StatusOption>) => {
  return (
    <DefaultOption<StatusOption>
      {...props}
      customLabel={(data, label) => (
        <span className="flex items-center gap-2">
          {/* <Badge className={data.dotBackground} /> */}
          <span>{label}</span>
        </span>
      )}
    />
  )
}

const CustomControl = ({ children, ...props }: ControlProps<StatusOption>) => {
  const selected = props.getValue()[0]
  return (
    <Control {...props}>
      {selected && (
        <div className="flex ml-3">
          {/* <Badge className={selected.dotBackground} /> */}
        </div>
      )}
      {children}
    </Control>
  )
}

const AttendanceRegularisationListTableFilter = () => {
  const { filterData, setFilterData } =
    useLeaveApplicationListStore()

  const handleStatusChange = (status: string) => {
    setFilterData({ ...filterData, status })
  }

  return (
    <div className='flex items-center'>
      <Select<StatusOption, false>
        className="min-w-[200px] w-full"
        components={{
          Control: CustomControl,
          Option: StatusSelectOption,
        }}
        options={statusOptions}
        size="sm"
        placeholder="Status"
        defaultValue={{
          label: 'All Status',
          value: '',
          dotBackground: 'bg-gray-200',
        }}
        onChange={(option) =>
          handleStatusChange(option?.value || '')
        }
      />
    </div>
  )
}

export default AttendanceRegularisationListTableFilter