export const SchoolVaccinationPortalApis = {
    login: `school-vaccination-portal/login`,
    studentStats: `vaccine-records/dashboard`,
    addStudent: `students`,
    getStudents:(limit=10,offset=0) => `vaccine-records/students?limit=${limit}&offset=${offset}`,
    getStudentByName:(limit=10,offset=0, name='', ) => `vaccine-records/students?name=${name}&limit=${limit}&offset=${offset}`,
    getStudentsByVaccineName:(limit=10,offset=0, vaccine_name='') => `vaccine-records/students?vaccine_name=${vaccine_name}&limit=${limit}&offset=${offset}`,
    getStudentsByStudentVaccineName:(limit=10,offset=0, name='', vaccine_name='') => `vaccine-records/students?name=${name}&vaccine_name=${vaccine_name}&limit=${limit}&offset=${offset}`,
    updateStudentVaccinationStatus: `vaccine-records`,
    bulkCreateStudentRecords: `bulk-upload/students`,
    bulkUpdateVaccineRecords: `bulk-upload/vaccine-records`,
    getDrives: `vaccine/drives`,
    scheduleDrive: `vaccine/drives`,
    getReports: (limit=10,offset=10) =>`bulk-upload?limit=${limit}&offset=${offset}`,
    generateReport: `vaccine-records/genrate-report`
}