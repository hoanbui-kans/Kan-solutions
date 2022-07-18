import { Calendar } from 'rsuite';

export const locales = {
  common: {
    loading: 'Đang tải...',
    emptyMessage: 'Không có dữ liệu nào'
  },
  Plaintext: {
    unfilled: 'Unfilled',
    notSelected: 'Not selected',
    notUploaded: 'Not uploaded'
  },
  Pagination: {
    more: 'Nhiều hơn',
    prev: 'Trước',
    next: 'Kế tiếp',
    first: 'Trang đầu',
    last: 'Trang cuối',
    limit: '{0} / trang',
    total: 'Tổng cộng: {0}',
    skip: 'Đi đến {0}'
  },
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'Last 7 Days'
  },
  Picker: {
    noResultsText: 'Không có dữ liệu nào được tìm thấy',
    placeholder: 'Lựa chọn',
    searchPlaceholder: 'Tìm kiếm...',
    checkAll: 'Tất cả'
  },
  InputPicker: {
    newItem: 'New item',
    createOption: 'Create option "{0}"'
  },
  Uploader: {
    inited: 'Initial',
    progress: 'Uploading',
    error: 'Error',
    complete: 'Finished',
    emptyFile: 'Empty',
    upload: 'Upload'
  },
  CloseButton: {
    closeLabel: 'Close'
  },
  Breadcrumb: {
    expandText: 'Show path'
  },
  Toggle: {
    on: 'Open',
    off: 'Close'
  }
};
