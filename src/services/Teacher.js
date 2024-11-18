import axios from "../setup/axios"  

const teacherPB = (user) => {
    return axios.put("/api/v1/teacher/getLichChamPB", {data : {maSo : user.maSo} })
}

export {
    teacherPB
}