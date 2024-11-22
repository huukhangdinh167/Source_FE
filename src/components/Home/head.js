import React from "react";
import './home.scss';

const headHome = () => {
    return (
        <div className="container mt-4">
            <header className="mb-4">
                <h3 className="fw-bold text-center">Chào mừng đến với giao diện Trưởng Bộ Môn</h3>
                <p className="text-center text-muted">Thông tin quản lý của bạn tại đây.</p>
            </header>

            <section className="row g-4">
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title h5 fw-bold">Đề tài</h3>
                            <p className="card-text text-muted">Xem tất cả đề tài của tất cả giáo viên</p>
                            <a href="/head-project" className="btn btn-primary w-100" style={{ backgroundColor: '#1d3557' }}>
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title h5 fw-bold">Thống kê</h3>
                            <p className="card-text text-muted">Xem dữ liệu thống kê</p>
                            <a href="/s" className="btn btn-primary w-100" style={{ backgroundColor: '#1d3557' }}>
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title h5 fw-bold">Phân công Phản biện</h3>
                            <p className="card-text text-muted">Phân công phản biện cho các nhóm phản biện</p>
                            <a href="/head/assginmentGV" className="btn btn-primary w-100" style={{ backgroundColor: '#1d3557' }}>
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title h5 fw-bold">Phân quyền</h3>
                            <p className="card-text text-muted">Phân quyền cho giảng viên và sinh viên</p>
                            <a href="/head/assginmentrol" className="btn btn-primary w-100" style={{ backgroundColor: '#1d3557' }}>
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default headHome;