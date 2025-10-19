


## Các hook tối ưu hiệu năng

- **React.memo** sử dụng trong component `EmployeeTotal` để tránh render lại component con khi `totalEmployee` không thay đổi.

- **useCallback** dùng cho các hàm `handleSearch` và `handleSelect` giúp giữ tham chiếu hàm ổn định, tránh tạo hàm mới không cần thiết, từ đó hạn chế việc render lại các component con như `EmployeeSearch` và `EmployeeFilter`.

- **useEffect** được sử dụng trong component `EmployeeList` để gọi API lấy danh sách nhân viên ngay lần đầu truy cập trang.
---




