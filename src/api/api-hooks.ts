import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchAcademicModule,
  fetchAdmissionDetails,
  fetchAdmissionOngoingList,
  fetchAdmissionSiteInfo,
  fetchAllBooksByLibrary,
  fetchAllDepartments,
  fetchAllEnquiryList,
  fetchAllEvents,
  fetchAllFeesStructure,
  fetchAllInstituteStaff,
  fetchAllMergedDepartments,
  fetchAlumniDash,
  fetchDepartmentAllStaff,
  fetchDepartmentMouCollab,
  fetchDepartmentSiteInfo,
  fetchDocumentByAdmission,
  fetchExaminationDetails,
  fetchFacilitiesModule,
  fetchHostInstitute,
  fetchInstituteMaster,
  fetchIqacAuthority,
  fetchIqacComposition,
  fetchIqacDetails,
  fetchLibrarySiteInfo,
  fetchNaacDetails,
  fetchNoticeInstitute,
  fetchNssModule,
  fetchOneApplication,
  fetchOneAudit,
  fetchOneBookDetail,
  fetchOneEvent,
  fetchOneFeeStructureDetail,
  fetchOneIqacAuthority,
  fetchOneNoticeDetail,
  fetchOnePinnedDepartment,
  fetchOneRndActivity,
  fetchOneRndSection,
  fetchPinnedDepartment,
  fetchQualityInitiatives,
  fetchRndActivities,
  fetchRndMou,
  fetchRndMouBatch,
  fetchRndMouOne,
  fetchRndProjects,
  fetchScholarshipListAdmission,
  fetchSiteOpener,
  fetchWebsiteInfoByInstitute,
} from "./query";
import { data } from "@/lib/type";
import { sendEnquiry } from "./mutation";

export const useInstituteMaster = (id: string | undefined) => {
  return useQuery({
    queryKey: ["instituteMaster", id],
    queryFn: () => fetchInstituteMaster(id!),

    enabled: !!id,
  });
};

export const useAdmissionOngoingList = (aid: string | undefined) => {
  return useQuery({
    queryKey: ["admissionOngoingList", aid],
    queryFn: () => fetchAdmissionOngoingList(aid!),

    enabled: !!aid,
  });
};

export const useAdmissionDetails = (data: data | undefined) => {
  return useQuery({
    queryKey: ["admissionDetails", data?.aid, data?.sid],
    queryFn: () => fetchAdmissionDetails(data!),

    enabled: !!data?.aid,
  });
};

export const useWebsiteInfoByInstitute = (id: string | undefined) => {
  return useQuery({
    queryKey: ["websiteInfoByInstitute", id],
    queryFn: () => fetchWebsiteInfoByInstitute(id!),

    enabled: !!id,
  });
};

export const useNoticeInstitute = (data: data | undefined) => {
  return useQuery({
    queryKey: ["noticeInstitute", data?.id, data?.page, data?.limit],
    queryFn: () => fetchNoticeInstitute(data!),

    enabled: !!data?.id,
  });
};

export const useOneNoticeDetail = (annId: string | undefined) => {
  return useQuery({
    queryKey: ["oneNoticeDetail", annId],
    queryFn: () => fetchOneNoticeDetail(annId!),

    enabled: !!annId,
  });
};

export const useDocumentByAdmission = (data: data | undefined) => {
  return useQuery({
    queryKey: ["documentByAdmission", data?.aid, data?.page, data?.limit],
    queryFn: () => fetchDocumentByAdmission(data!),

    enabled: !!data?.aid,
  });
};

export const useAdmissionSiteInfo = (aid: string | undefined) => {
  return useQuery({
    queryKey: ["admissionSiteInfo", aid],
    queryFn: () => fetchAdmissionSiteInfo(aid!),

    enabled: !!aid,
  });
};

export const useLibrarySiteInfo = (lid: string | undefined) => {
  return useQuery({
    queryKey: ["librarySiteInfo", lid],
    queryFn: () => fetchLibrarySiteInfo(lid!),
    enabled: !!lid,
  });
};

export const useDepartmentSiteInfo = (did: string | undefined) => {
  return useQuery({
    queryKey: ["departmentSiteInfo", did],
    queryFn: () => fetchDepartmentSiteInfo(did!),
    enabled: !!did,
  });
};

export const useAllDepartments = (id: string | undefined) => {
  return useQuery({
    queryKey: ["allDepartments", id],
    queryFn: () => fetchAllDepartments(id!),
    enabled: !!id,
  });
};

export const useDepartmentAllStaff = (data: data | undefined) => {
  return useQuery({
    queryKey: ["departmentAllStaff", data?.did, data?.page, data?.limit],
    queryFn: () => fetchDepartmentAllStaff(data!),

    enabled: !!data?.did,
  });
};

export const useAllInstituteStaff = (data: data | undefined) => {
  return useQuery({
    queryKey: [
      "allInstituteStaff",
      data?.id,
      data?.page,
      data?.limit,
      data?.date,
    ],
    queryFn: () => fetchAllInstituteStaff(data!),

    enabled: !!data?.id,
  });
};

export const useAllBooksByLibrary = (data: data | undefined) => {
  return useQuery({
    queryKey: [
      "allBooksByLibrary",
      data?.lid,
      data?.page,
      data?.limit,
      data?.search,
    ],
    queryFn: () => fetchAllBooksByLibrary(data!),

    enabled: !!data?.lid,
  });
};

export const useOneBookDetail = (bid: string | undefined) => {
  return useQuery({
    queryKey: ["oneBookDetail", bid],
    queryFn: () => fetchOneBookDetail(bid!),
    enabled: !!bid,
  });
};

export const useAllFeesStructure = (data: data | undefined) => {
  return useQuery({
    queryKey: [
      "allFeesStructure",
      data?.did,
      data?.page,
      data?.limit,
      data?.filterBy,
      data?.batch_by,
    ],
    queryFn: () => fetchAllFeesStructure(data!),

    enabled: !!data?.did,
  });
};
export const useOneFeeStructureDetail = (fsid: string | undefined) => {
  return useQuery({
    queryKey: ["oneFeeStructureDetail", fsid],
    queryFn: () => fetchOneFeeStructureDetail(fsid!),
    enabled: !!fsid,
  });
};

export const useHostInstitute = (filter_by: string | undefined) => {
  return useQuery({
    queryKey: ["hostInstitute", filter_by],
    queryFn: () => fetchHostInstitute(filter_by!),
    enabled: !!filter_by,
  });
};

export const useAllEnquiryList = (
  data: { aid: string; status: string; page: number; limit: number } | undefined
) => {
  return useQuery({
    queryKey: [
      "allEnquiryList",
      data?.aid,
      data?.status,
      data?.page,
      data?.limit,
    ],
    queryFn: () => fetchAllEnquiryList(data!),
    enabled: !!data,
  });
};

export const useScholarshipListAdmission = (
  data: { aid: string; page: number; limit: number; status: string } | undefined
) => {
  return useQuery({
    queryKey: [
      "scholarshipListAdmission",
      data?.aid,
      data?.status,
      data?.page,
      data?.limit,
    ],
    queryFn: () => fetchScholarshipListAdmission(data!),
    enabled: !!data,
  });
};

export const useOneApplication = (apid: string | undefined) => {
  return useQuery({
    queryKey: ["oneApplication", apid],
    queryFn: () => fetchOneApplication(apid!),
    enabled: !!apid,
  });
};

export const useAcademicModule = (aid: string | undefined) => {
  return useQuery({
    queryKey: ["academicModule", aid],
    queryFn: () => fetchAcademicModule(aid!),
    enabled: !!aid,
  });
};

export const useNssModule = (nid: string | undefined) => {
  return useQuery({
    queryKey: ["nssModule", nid],
    queryFn: () => fetchNssModule(nid!),
    enabled: !!nid,
  });
};

export const useFacilitiesModule = (fid: string | undefined) => {
  return useQuery({
    queryKey: ["facilitiesModule", fid],
    queryFn: () => fetchFacilitiesModule(fid!),
    enabled: !!fid,
  });
};

export const usePinnedDepartment = (
  data: { id: string | undefined; flow: string } | undefined
) => {
  return useQuery({
    queryKey: ["pinnedDepartment", data?.id, data?.flow],
    queryFn: () => fetchPinnedDepartment(data!),
    enabled: !!data,
  });
};

export const useOnePinnedDepartment = (
  data: { id: string | undefined; type: string | undefined } | undefined
) => {
  return useQuery({
    queryKey: ["onePinnedDepartment", data?.id, data?.type],
    queryFn: () => fetchOnePinnedDepartment(data!),
    enabled: !!data,
  });
};

export const useDepartmentMouCollab = (
  data:
    | {
        did: string;
        page: number;
        limit: number;
        search: string;
        batch: string;
      }
    | undefined
) => {
  return useQuery({
    queryKey: [
      "departmentMouCollab",
      data?.did,
      data?.page,
      data?.limit,
      data?.search,
      data?.batch,
    ],
    queryFn: () => fetchDepartmentMouCollab(data!),
    enabled: !!data,
  });
};

export const useAllMergedDepartments = (
  data: { id: string; page: number; limit: number; search: string } | undefined
) => {
  return useQuery({
    queryKey: [
      "allMergedDepartments",
      data?.id,
      data?.page,
      data?.limit,
      data?.search,
    ],
    queryFn: () => fetchAllMergedDepartments(data!),
    enabled: !!data,
  });
};

export const useIqacAuthority = (qid: string | undefined) => {
  return useQuery({
    queryKey: ["iqacAuthority", qid],
    queryFn: () => fetchIqacAuthority(qid!),
    enabled: !!qid,
  });
};

export const useOneIqacAuthority = (qcid: string | undefined) => {
  return useQuery({
    queryKey: ["oneIqacAuthority", qcid],
    queryFn: () => fetchOneIqacAuthority(qcid!),
    enabled: !!qcid,
  });
};

export const useIqacComposition = (
  data: { qcid: string | undefined; limit: number; page: number } | undefined
) => {
  return useQuery({
    queryKey: ["iqacComposition", data?.qcid, data?.page, data?.limit],
    queryFn: () => fetchIqacComposition(data!),
    enabled: !!data,
  });
};

export const useIqacDetails = (
  data:
    | {
        id: string | undefined;
        page: number;
        limit: number;
        flow: string;
        type: string;
        search: string;
      }
    | undefined
) => {
  return useQuery({
    queryKey: [
      "iqacDetails",
      data?.id,
      data?.page,
      data?.limit,
      data?.flow,
      data?.type,
      data?.search,
    ],
    queryFn: () => fetchIqacDetails(data!),
    enabled: !!data,
  });
};

export const useQualityInitiatives = (
  data: { id: string; type: string } | undefined
) => {
  return useQuery({
    queryKey: ["qualityInitiatives", data?.id, data?.type],
    queryFn: () => fetchQualityInitiatives(data!),
    enabled: !!data,
  });
};

export const useOneAudit = (
  data:
    | { id: string; page: number; limit: number; type: string; search: string }
    | undefined
) => {
  return useQuery({
    queryKey: [
      "oneAudit",
      data?.id,
      data?.page,
      data?.limit,
      data?.type,
      data?.search,
    ],
    queryFn: () => fetchOneAudit(data!),
    enabled: !!data,
  });
};

export const useNaacDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ["naacDetails", id],
    queryFn: () => fetchNaacDetails(id!),
    enabled: !!id,
  });
};

export const useAlumniDash = (id: string | undefined) => {
  return useQuery({
    queryKey: ["alumniDash", id],
    queryFn: () => fetchAlumniDash(id!),
    enabled: !!id,
  });
};

export const useOneRndSection = (
  data:
    | { id: string; page: number; limit: number; search: string; flow: string }
    | undefined
) => {
  return useQuery({
    queryKey: [
      "oneRndSection",
      data?.id,
      data?.page,
      data?.limit,
      data?.search,
      data?.flow,
    ],
    queryFn: () => fetchOneRndSection(data!),
    enabled: !!data,
  });
};

export const useRndMou = (
  data: { id: string; page: number; limit: number; search: string } | undefined
) => {
  return useQuery({
    queryKey: ["rndMou", data?.id, data?.page, data?.limit, data?.search],
    queryFn: () => fetchRndMou(data!),
    enabled: !!data,
  });
};

export const useRndMouBatch = (
  data: { id: string; page: number; limit: number; search: string } | undefined
) => {
  return useQuery({
    queryKey: ["rndMouBatch", data?.id, data?.page, data?.limit, data?.search],
    queryFn: () => fetchRndMouBatch(data!),
    enabled: !!data,
  });
};

export const useRndMouOne = (
  data:
    | { id: string; page: number; limit: number; search: string; batch: string }
    | undefined
) => {
  return useQuery({
    queryKey: [
      "rndMouOne",
      data?.batch,
      data?.id,
      data?.page,
      data?.limit,
      data?.search,
    ],
    queryFn: () => fetchRndMouOne(data!),
    enabled: !!data,
  });
};

export const useRndActivities = (
  data:
    | { page: number; limit: number; search: string; sid: string; flow: string }
    | undefined
) => {
  return useQuery({
    queryKey: [
      "rndActivities",
      data?.sid,
      data?.page,
      data?.limit,
      data?.search,
      data?.flow,
    ],
    queryFn: () => fetchRndActivities(data!),
    enabled: !!data,
  });
};

export const useOneRndActivity = (acid: string | undefined) => {
  return useQuery({
    queryKey: ["oneRndActivity", acid],
    queryFn: () => fetchOneRndActivity(acid!),
    enabled: !!acid,
  });
};

export const useRndProjects = (
  data:
    | { page: number; limit: number; search: string; did: string; flow: string }
    | undefined
) => {
  return useQuery({
    queryKey: [
      "rndProjects",
      data?.did,
      data?.page,
      data?.limit,
      data?.search,
      data?.flow,
    ],
    queryFn: () => fetchRndProjects(data!),
    enabled: !!data,
  });
};

export const useExaminationDetails = (eid: string | undefined) => {
  return useQuery({
    queryKey: ["examinationDetails", eid],
    queryFn: () => fetchExaminationDetails(eid!),
    enabled: !!eid,
  });
};
export const useSiteOpener = (id: string | undefined) => {
  return useQuery({
    queryKey: ["siteOpener", id],
    queryFn: () => fetchSiteOpener(id!),
    enabled: !!id,
  });
};

export const useAllEvents = (eid: string | undefined) => {
  return useQuery({
    queryKey: ["allEvents", eid],
    queryFn: () => fetchAllEvents(eid!),
    enabled: !!eid,
  });
};

export const useOneEvent = (evid: string | undefined) => {
  return useQuery({
    queryKey: ["oneEvent", evid],
    queryFn: () => fetchOneEvent(evid!),
    enabled: !!evid,
  });
};
