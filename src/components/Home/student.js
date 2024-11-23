import React from "react";
import './home.scss';

const studentHome = () => {
    return (
        <div className="container mt-4">
            <header className="mb-4">
                <h3 className="fw-bold text-center">Chào mừng đến với giao diện sinh viên</h3>
                <p className="text-center text-muted">Quản lý thông tin khóa luận của bạn tại đây.</p>
            </header>

            <section className="row g-4">
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title h5 fw-bold">Đăng ký đề tài</h3>
                            <p className="card-text text-muted">Lựa chọn và đăng ký các đề tài phù hợp.</p>
                            <a href="/project" className="btn btn-primary w-100" style={{ backgroundColor: '#1d3557' }}>
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title h5 fw-bold">Kết quả chấm</h3>
                            <p className="card-text text-muted">Tra cứu kết quả chấm điểm khóa luận của bạn.</p>
                            <a href="/results" className="btn btn-primary w-100" style={{ backgroundColor: '#1d3557' }}>
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title h5 fw-bold">Lịch sử khóa luận</h3>
                            <p className="card-text text-muted">Theo dõi quá trình làm khóa luận của bạn.</p>
                            <a href="/history" className="btn btn-primary w-100" style={{ backgroundColor: '#1d3557' }}>
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default studentHome;
