import { apiClient } from "./apiClient";

export const fetchInstituteMaster = async (id: string | undefined) => {
  const response = await apiClient.get(`/v1/ins/${id}/dash`);
  return response.data;
};

export const fetchAdmissionOngoingList = async (aid: string | undefined) => {
  const response = await apiClient.get(
    `/v2/admission/${aid}/all/ongoing/application/pinned`
  );
  return response.data;
};

export const fetchAdmissionDetails = async (data: any) => {
  const response = await apiClient.get(
    `/v1/admission/${data.aid}/dashboard/query?sid=${data.sid}`
  );
  return response.data;
};

export const fetchWebsiteInfoByInstitute = async (id: string | undefined) => {
  const response = await apiClient.get(`/v1/landing/${id}/one/web/profile`);
  return response.data;
};

export const fetchNoticeInstitute = async (data: any) => {
  const response = await apiClient.get(
    `/v1/ins/${data.id}/announcemnt?page=${data.page}&limit=${data.limit}`
  );
  return response.data;
};

export const fetchOneNoticeDetail = async (annId: string | undefined) => {
  const response = await apiClient.get(`/v1/ins/one/announcement/${annId}`);
  return response.data;
};

export const fetchDocumentByAdmission = async (data: any) => {
  const response = await apiClient.get(
    `/v1/admission/${data.aid}/all/document/array?page=${data.page}&limit=${data.limit}`
  );
  return response.data;
};

export const fetchAdmissionSiteInfo = async (aid: string | undefined) => {
  const response = await apiClient.get(`/v1/site/info/admission/${aid}`);
  return response.data;
};

export const fetchLibrarySiteInfo = async (lid: string | undefined) => {
  const response = await apiClient.get(`/v1/site/info/library/${lid}`);
  return response.data;
};

export const fetchDepartmentSiteInfo = async (did: string | undefined) => {
  const response = await apiClient.get(`/v1/site/info/department/${did}`);
  return response.data;
};

export const fetchAllDepartments = async (id: string | undefined) => {
  const response = await apiClient.get(`/v1/ins/${id}/department`);
  return response.data;
};

export const fetchDepartmentAllStaff = async (data: any) => {
  const response = await apiClient.get(
    `/v1/landing/${data.did}/all/faculty/query?page=${data.page}&limit=${data.limit}`
  );
  return response.data;
};

export const fetchAllInstituteStaff = async (data: any) => {
  const response = await apiClient.get(
    `/v1/ins/${data.id}/approve-staff/list?page=${data.page}&limit=${data.limit}&date=${data.date}`
  );
  return response.data;
};

export const fetchAllBooksByLibrary = async (data: any) => {
  const response = await apiClient.get(
    `/v1/library/site/books/${data.lid}?page=${data.page}&limit=${data.limit}&search=${data.search}`
  );
  return response.data;
};

export const fetchOneBookDetail = async (bid: any) => {
  const response = await apiClient.get(`/v1/library/book/detail/${bid}`);
  return response.data;
};

export const fetchAllFeesStructure = async (data: any) => {
  const response = await apiClient.get(
    `/v1/finance/depart/${data.did}/all/fee/structure?page=${data.page}&limit=${
      data.limit
    }&filter_by=${data.filterBy}&batch_by=${data.batch_by ?? ""}`
  );
  return response.data;
};

export const fetchOneFeeStructureDetail = async (fsid: any) => {
  const response = await apiClient.get(`/v1/finance/one/${fsid}/structure`);
  return response.data;
};

export const fetchHostInstitute = async (filter_by: any) => {
  const response = await apiClient.get(
    `/v1/admin/sub/domain/by/host?filter_by=${filter_by}`
  );
  return response.data;
};

export const fetchAllEnquiryList = async (data: any) => {
  const response = await apiClient.get(
    `/v1/admission/${data.aid}/all/inquiry?status=${data.status}&page=${data.page}&limit=${data.limit}`
  );
  return response.data;
};

export const fetchScholarshipListAdmission = async (data: any) => {
  const response = await apiClient.get(
    `/v1/admission/${data.aid}/all/scholarship?page=${data.page}&limit=${data.limit}&status=${data.status}`
  );
  return response.data;
};

export const fetchOneApplication = async (apid: string | undefined) => {
  const response = await apiClient.get(
    `/v1/admission/${apid}/application/query`
  );
  return response.data;
};

export const fetchAcademicModule = async (aid: string | undefined) => {
  const response = await apiClient.get(
    `/v1/landing/${aid}/academic/section/query`
  );
  return response.data;
};

export const fetchNssModule = async (nid: string | undefined) => {
  const response = await apiClient.get(`/v1/landing/${nid}/nss/query`);
  return response.data;
};

export const fetchFacilitiesModule = async (fid: string | undefined) => {
  const response = await apiClient.get(`/v1/landing/${fid}/facilities/query`);
  return response.data;
};

export const fetchPinnedDepartment = async (data: any) => {
  const response = await apiClient.get(
    `/v1/landing/${data.id}/all/pinned/department/query?flow=${data.flow}`
  );
  return response.data;
};

export const fetchOnePinnedDepartment = async (data: any) => {
  const response = await apiClient.get(
    `/v1/landing/${data.id}/one/pinned/department/query?type=${data.type}`
  );
  return response.data;
};

export const fetchDepartmentMouCollab = async (data: any) => {
  const response = await apiClient.get(
    `/v1/site/${data.did}/all/mou/collab/query?page=${data.page}&limit=${data.limit}&search=${data.search}&batch=${data.batch}`
  );
  return response.data;
};

export const fetchAllMergedDepartments = async (data: any) => {
  const response = await apiClient.get(
    `/v2/ins/${data.id}/all/merged/department?page=${data.page}&limit=${data.limit}&search=${data.search}`
  );
  return response.data;
};

export const fetchIqacAuthority = async (qid: string | undefined) => {
  const response = await apiClient.get(`/v2/committee/${qid}/dashboard`);
  return response.data;
};

export const fetchOneIqacAuthority = async (qcid: string | undefined) => {
  const response = await apiClient.get(
    `/v2/committee/${qcid}/custom/dashboard`
  );
  return response.data;
};

export const fetchIqacComposition = async (data: any) => {
  const response = await apiClient.get(
    `/v2/committee/${data.qcid}/all/composition/query?limit=${data.limit}&page=${data.page}`
  );
  return response.data;
};

export const fetchIqacDetails = async (data: any) => {
  const response = await apiClient.get(
    `/v2/committee/${data.id}/all/about/query?page=${data.page}&limit=${data.limit}&flow=${data.flow}&type=${data.type}&search=${data.search}`
  );
  return response.data;
};

export const fetchQualityInitiatives = async (data: any) => {
  const response = await apiClient.get(
    `/v1/site/all/activity/query/type?id=${data.id}&type=${data.type}`
  );
  return response.data;
};

export const fetchOneAudit = async (data: any) => {
  const response = await apiClient.get(
    `/v2/committee/${data.id}/all/audit/reports/query?page=${data.page}&limit=${data.limit}&tab_type=${data.type}&search=${data.search}`
  );
  return response.data;
};

export const fetchNaacDetails = async (id: string | undefined) => {
  const response = await apiClient.get(
    `/v2/committee/${id}/all/naac/master/query`
  );
  return response.data;
};

export const fetchAlumniDash = async (id: string | undefined) => {
  const response = await apiClient.get(`/v1/alumini/${id}/dashboard/query`);
  return response.data;
};

export const fetchOneRndSection = async (data: any) => {
  const response = await apiClient.get(
    `/v2/committee/${data.id}/all/sections/query?page=${data.page}&limit=${data.limit}&search=${data.search}&flow=${data.flow}`
  );
  return response.data;
};

export const fetchRndMou = async (data: any) => {
  const response = await apiClient.get(
    `/v2/ins/${data.id}/all/merged/department?page=${data.page}&limit=${data.limit}&search=${data.search}`
  );
  return response.data;
};

export const fetchRndMouBatch = async (data: any) => {
  const response = await apiClient.get(
    `/v1/site/${data.id}/all/universal/batch/query?page=${data.page}&limit=${data.limit}&search=${data.search}`
  );
  return response.data;
};

export const fetchRndMouOne = async (data: any) => {
  const response = await apiClient.get(
    `/v1/site/${data.id}/all/mou/collab/query?page=${data.page}&limit=${data.limit}&search=${data.search}&batch=${data.batch}`
  );
  return response.data;
};

export const fetchRndActivities = async (data: any) => {
  const response = await apiClient.get(
    `/v1/site/all/activity/query?page=${data.page}&limit=${data.limit}&search=${data.search}&sid=${data.sid}&flow=${data.flow}`
  );
  return response.data;
};

export const fetchOneRndActivity = async (acid: any) => {
  const response = await apiClient.get(`/v1/site/${acid}/one/activity/query`);
  return response.data;
};

export const fetchRndProjects = async (data: any) => {
  const response = await apiClient.get(
    `/v1/site/all/projects/query?page=${data.page}&limit=${data.limit}&search=${data.search}&did=${data.did}&flow=${data.flow}`
  );
  return response.data;
};

export const fetchExaminationDetails = async (eid: string | undefined) => {
  const response = await apiClient.get(
    `/v1/landing/${eid}/all/examination/object/query`
  );
  return response.data;
};

export const fetchSiteOpener = async (id: any) => {
  const response = await apiClient.get(`/v1/site/institute/${id}/opener`);
  return response.data;
};

export const fetchAllEvents = async (eid: string | undefined) => {
  const response = await apiClient.get(
    `/v1/event/process/manager/${eid}/all/events`
  );
  return response.data;
};

export const fetchOneEvent = async (evid: string | undefined) => {
  const response = await apiClient.get(`/v1/event/process/one/event/${evid}`);
  return response.data;
};
