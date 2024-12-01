import React from "react";
import './home.scss';
const teacherHome = () => {
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
                            <h3 className="card-title h5 fw-bold">Quản lý đề tài</h3>
                            <p className="card-text text-muted">Quản lý các đề tài của mình</p>
                            <a href="/teacher/projects" className="btn btn-primary w-100" style={{ backgroundColor: '#1d3557' }}>
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title h5 fw-bold">Chấm hội đồng</h3>
                            <p className="card-text text-muted">Chấm hội đồng các nhóm được phân công</p>
                            <a href="/teacher-chamHoiDong" className="btn btn-primary w-100" style={{ backgroundColor: '#1d3557' }}>
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title h5 fw-bold">Chấm điểm phản biện</h3>
                            <p className="card-text text-muted">Chấm điểm các nhóm phản biện được phân công</p>
                            <a href="/teacher-chamPB" className="btn btn-primary w-100" style={{ backgroundColor: '#1d3557' }}>
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title h5 fw-bold">Chấm điểm hướng dẫn</h3>
                            <p className="card-text text-muted">Chấm điểm các nhóm mà mình hướng dẫn</p>
                            <a href="/teacher-chamHD" className="btn btn-primary w-100" style={{ backgroundColor: '#1d3557' }}>
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default teacherHome;