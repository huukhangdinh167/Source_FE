import { useEffect, useState } from 'react'
import { GetDSHoiDong } from '../../../services/HeadService'

const HeadKetQuaCham = () => {
    const [dshd, setDSHD] = useState([]);


    const danhsachhoidong = async () => {
        try {
            const data = await GetDSHoiDong();
            if (data.EC == 0) {
                setDSHD(data.DT);
                // console.log(data.DT)
            } else {
                console.log("Lỗi lấy danh sách hội đồng:", data.EM);
            }
        } catch (error) {
            console.error("Lỗi trong quá trình gọi API:", error);
        }
    }

    useEffect(() => {
        danhsachhoidong();

    }, []);
    // const data = [

    //         { id: 1, name: "Student 1", Result: { trungbinhphanbien: 8.5 } },
    //         { id: 2, name: "Student 2", Result: { trungbinhphanbien: 9.1 } },
    //         { id: 3, name: "Student 3", Result: { trungbinhphanbien: 6.9 } },
    //         { id: 4, name: "Student 4", Result: { trungbinhphanbien: 9.1 } },
    //         { id: 6, name: "Student 6", Result: { trungbinhphanbien: 9.3 } },
    //         { id: 8, name: "Student 8", Result: { trungbinhphanbien: 8.9 } },
    //         { id: 9, name: "Student 9", Result: { trungbinhphanbien: 6.2 } },
    //         { id: 10, name: "Student 10", Result: { trungbinhphanbien: 7.7 } },
    //         { id: 11, name: "Student 11", Result: { trungbinhphanbien: 8.1 } },
    //         { id: 12, name: "Student 12", Result: { trungbinhphanbien: 7.0 } },
    //         { id: 13, name: "Student 13", Result: { trungbinhphanbien: 6.5 } },
    //         { id: 14, name: "Student 14", Result: { trungbinhphanbien: 9.3 } },
    //         { id: 15, name: "Student 15", Result: { trungbinhphanbien: 6.0 } },
    //         { id: 16, name: "Student 16", Result: { trungbinhphanbien: 5.0 } },
    //         { id: 17, name: "Student 17", Result: { trungbinhphanbien: 7.8 } },
    //         { id: 18, name: "Student 18", Result: { trungbinhphanbien: 8.6 } },
    //         { id: 19, name: "Student 19", Result: { trungbinhphanbien: 8.6 } },
    //         { id: 19, name: "Student 20", Result: { trungbinhphanbien: 9.1 } },
    //         { id: 20, name: "Student 21", Result: { trungbinhphanbien: 9.1 } }


    // ]

    const renderedGroups = new Map();
    const handleAssign = async () => {
    }

    const calculateTotalScoresAndSort = (students) => {
        // Nhóm các sinh viên theo group
        const grouped = students.reduce(
            (groups, student) => {
                const groupKey = student.groupStudent || "null"; // Xử lý group null
                if (!groups[groupKey]) {
                    groups[groupKey] = [];
                }
                groups[groupKey].push(student);
                return groups;
            },
            {}
        );

        // Tính điểm tổng cho từng nhóm
        const results = [];
        for (const [group, members] of Object.entries(grouped)) {
            if (group === "null") {
                // Sinh viên có group null, tính điểm tổng riêng từng sinh viên
                members.forEach((student) => {
                    const trungBinhPhanBien = student.Result.trungbinhphanbien || 0;
                    const diemGVHD = parseFloat(student.Result.diemGVHD || "0"); // Chuyển đổi từ chuỗi sang float

                    results.push({
                        ...student,
                        totalScore: (trungBinhPhanBien + diemGVHD) / 2,
                    });
                });
            } else {
                // Tính điểm trung bình cho cả nhóm
                const averageScore =
                    members.reduce((sum, student) => {
                        const trungBinhPhanBien = student.Result.trungbinhphanbien || 0;
                        const diemGVHD = parseFloat(student.Result.diemGVHD || "0"); // Chuyển đổi từ chuỗi sang float

                        return sum + (trungBinhPhanBien + diemGVHD) / 2;
                    }, 0) / members.length;

                members.forEach((student) => {
                    results.push({
                        ...student,
                        totalScore: averageScore,
                    });
                });
            }
        }



        // Sắp xếp theo điểm tổng giảm dần
        results.sort((a, b) => b.totalScore - a.totalScore);

        return results;
    };

    // Dữ liệu đầu vào
    const students = [
        { id: 1, name: "Student 1", group: 232, Result: { trungbinhphanbien: 8.5 } },
        { id: 2, name: "Student 2", group: 242, Result: { trungbinhphanbien: 9.1 } },
        { id: 3, name: "Student 3", group: 232, Result: { trungbinhphanbien: 6.9 } },
        { id: 4, name: "Student 4", group: 242, Result: { trungbinhphanbien: 9.1 } },
        { id: 6, name: "Student 6", group: 272, Result: { trungbinhphanbien: 9.3 } },
        { id: 8, name: "Student 8", group: 222, Result: { trungbinhphanbien: 8.9 } },
        { id: 9, name: "Student 9", group: 222, Result: { trungbinhphanbien: 6.2 } },
        { id: 10, name: "Student 10", group: 272, Result: { trungbinhphanbien: 7.7 } },
        { id: 11, name: "Student 11", group: 202, Result: { trungbinhphanbien: 8.1 } },
        { id: 12, name: "Student 12", group: 212, Result: { trungbinhphanbien: 7.0 } },
        { id: 13, name: "Student 13", group: 202, Result: { trungbinhphanbien: 6.5 } },
        { id: 14, name: "Student 14", group: 212, Result: { trungbinhphanbien: 9.3 } },
        { id: 15, name: "Student 15", group: 252, Result: { trungbinhphanbien: 6.0 } },
        { id: 16, name: "Student 16", group: 252, Result: { trungbinhphanbien: 5.0 } },
        { id: 17, name: "Student 17", group: 282, Result: { trungbinhphanbien: 7.8 } },
        { id: 18, name: "Student 18", group: 282, Result: { trungbinhphanbien: 8.6 } },
        { id: 19, name: "Student 19", group: null, Result: { trungbinhphanbien: 8.6 } },
        { id: 19, name: "Student 20", group: null, Result: { trungbinhphanbien: 9.1 } },
        { id: 20, name: "Student 21", group: null, Result: { trungbinhphanbien: 9.1 } },
    ];

    // Tính và sắp xếp
    const sortedResults = calculateTotalScoresAndSort(dshd);
    // Lọc sinh viên có `Result` và `trungbinhphanbien` khác null
    const validStudents = sortedResults.filter(student => student && student.totalScore !== null);

    // Sắp xếp danh sách sinh viên theo điểm `trungbinhphanbien` giảm dần
    const sortedStudents = validStudents.sort(
        (a, b) => b.totalScore - a.totalScore
    );

    // Xác định số lượng sinh viên thuộc top 20%
    const top20PercentCount = Math.ceil(sortedStudents.length * 0.2);
    const minScoreForTop20 = sortedStudents[top20PercentCount - 1]?.totalScore;

    // Lọc sinh viên có điểm lớn hơn hoặc bằng điểm tối thiểu của top 20%
    const topStudents = sortedStudents.filter(
        student => student.totalScore >= minScoreForTop20
    );
    // In kết quả
    const topStudentNotNullTrungBinhPb = dshd.filter(student => student && student.Result && student.Result.trungbinhphanbien != null);
    const topStudentNullTrungBinhPb = dshd.filter(student => student && student.Result && student.Result.trungbinhphanbien == null);
    const topStudents80 = topStudentNotNullTrungBinhPb.filter(a => !topStudents.some(b => b.id === a.id));
    console.log("data đã lọc", topStudents80)
    console.log("dữ liệu 20%", topStudents);
    console.log("dữ liệu đầu vào", sortedResults);
    return (
        <div className='container'>
            <div className='mt-3'>
                <h4 style={{ display: 'inline-block', marginRight: '1rem' }}>
                    Danh sách các sinh viên được phân chấm Hội đồng
                    <b className='text-danger'>{topStudents && topStudents.length}</b>/{dshd && dshd.length}
                </h4> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <i style={{ display: 'inline-block' }}>
                    Số lượng sinh viên chưa được chấm phản biện
                    <b className='text-danger'> {topStudentNullTrungBinhPb && topStudentNullTrungBinhPb.length}</b>
                </i>
            </div>

            <table className="table text-center table-bordered table-hover mt-3">
                <thead>
                    <tr>
                        <th style={{ width: "4%" }}>ID</th>
                        <th style={{ width: "15%" }}>Tên</th>
                        <th style={{ width: "25%" }}>Tên Đề Tài</th>
                        <th style={{ width: "13%" }}>GVHD</th>
                        <th style={{ width: "9%" }}>Điểm GVHD</th>
                        <th style={{ width: "10%" }}>Điểm TBPB</th>
                        <th style={{ width: "10%" }}>Nhóm</th>
                        <th style={{ width: "10%" }}>Phân Công</th>
                        <th style={{ width: "10%" }}>Bộ Môn</th>
                    </tr>
                </thead>
                <tbody>
                    {topStudents && topStudents.map((item, index) => {
                        const isGroupNull = item.groupStudent === null || item.groupStudent === 'null';
                        const showButton =
                            isGroupNull ||
                            (!renderedGroups.has(item.groupStudent) && item.groupStudent !== 'null');

                        if (item.groupStudent && item.groupStudent !== 'null') {
                            renderedGroups.set(item.groupStudent, true);
                        }

                        return (
                            <tr key={`student-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.Project && item.Project.name}</td>
                                <td>{item.Project && item.Project.instuctor}</td>
                                <td>{item.Result && item.Result.diemGVHD}</td>
                                <td>{item.Result && item.Result.trungbinhphanbien}</td>
                                <td>{isGroupNull ? <i>Làm một mình</i> : item.groupStudent}</td>

                                {/* <td>
                                    {listtecher && (
                                        listtecher
                                            .filter(itemm => itemm.id == item.pb1)
                                            .map((itemmm, index) => (
                                                <p key={`pb1-${index}`}>{itemmm.name}</p>
                                            ))
                                    )}
                                    {listtecher && (
                                        listtecher
                                            .filter(itemm => itemm.id == item.pb2)
                                            .map((itemmm, index) => (
                                                <p key={`pb1-${index}`}>{itemmm.name}</p>
                                            ))
                                    )}
                                </td> */}
                                <td>
                                    {showButton && (
                                        <button onClick={() => handleAssign(item)} className='btn btn-success'>
                                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                        </button>
                                    )}
                                </td>
                                <td>IS</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className='mt-3'>
                <h4>Danh sách các sinh viên được phân chấm Poster <b className='text-danger'>{topStudents80 && topStudents80.length}</b>/{dshd && dshd.length}</h4>
            </div>
            <table className="table text-center table-bordered table-hover mt-3">
                <thead>
                    <tr>
                        <th style={{ width: "4%" }}>ID</th>
                        <th style={{ width: "15%" }}>Tên</th>
                        <th style={{ width: "25%" }}>Tên Đề Tài</th>
                        <th style={{ width: "13%" }}>GVHD</th>
                        <th style={{ width: "9%" }}>Điểm GVHD</th>
                        <th style={{ width: "10%" }}>Điểm TBPB</th>
                        <th style={{ width: "10%" }}>Nhóm</th>
                        <th style={{ width: "10%" }}>Phân Công</th>
                        <th style={{ width: "10%" }}>Bộ Môn</th>
                    </tr>
                </thead>
                <tbody>
                    {topStudents80 && topStudents80.map((item, index) => {
                        const isGroupNull = item.groupStudent === null || item.groupStudent === 'null';
                        const showButton =
                            isGroupNull ||
                            (!renderedGroups.has(item.groupStudent) && item.groupStudent !== 'null');

                        if (item.groupStudent && item.groupStudent !== 'null') {
                            renderedGroups.set(item.groupStudent, true);
                        }

                        return (
                            <tr key={`student-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.Project && item.Project.name}</td>
                                <td>{item.Project && item.Project.instuctor}</td>

                                <td>{item.Result && item.Result.diemGVHD}</td>
                                <td>{item.Result && item.Result.trungbinhphanbien}</td>
                                <td>{isGroupNull ? <i>Làm một mình</i> : item.groupStudent}</td>
                                {/* <td>
                                    {listtecher && (
                                        listtecher
                                            .filter(itemm => itemm.id == item.pb1)
                                            .map((itemmm, index) => (
                                                <p key={`pb1-${index}`}>{itemmm.name}</p>
                                            ))
                                    )}
                                    {listtecher && (
                                        listtecher
                                            .filter(itemm => itemm.id == item.pb2)
                                            .map((itemmm, index) => (
                                                <p key={`pb1-${index}`}>{itemmm.name}</p>
                                            ))
                                    )}
                                </td> */}
                                <td>
                                    {showButton && (
                                        <button onClick={() => handleAssign(item)} className='btn btn-success'>
                                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                        </button>
                                    )}
                                </td>
                                <td>IS</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default HeadKetQuaCham