import React from "react";
import './home.scss';


const adminHome = () => {
    return (
        <div className="container mt-4">
            <header className="mb-4">
                <h3 className="fw-bold text-center">Chào mừng đến với giao diện quản trị viên</h3>
                <p className="text-center text-muted">Quản lý thông tin của bạn tại đây.</p>
            </header>

            <section className="row g-4">
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title h5 fw-bold">Quản lý người dùng</h3>
                            <p className="card-text text-muted">Quản lý thông tin người dùng</p>
                            <a href="/admin/users" className="btn btn-primary w-100" style={{ backgroundColor: '#1d3557' }}>
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title h5 fw-bold">Thêm các quyền</h3>
                            <p className="card-text text-muted">Thêm các quyền cần thiết</p>
                            <a href="/admin/add-role" className="btn btn-primary w-100" style={{ backgroundColor: '#1d3557' }}>
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title h5 fw-bold">Gán quyền</h3>
                            <p className="card-text text-muted">Gán quyền theo nhóm</p>
                            <a href="/admin/assign-role" className="btn btn-primary w-100" style={{ backgroundColor: '#1d3557' }}>
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default adminHome;