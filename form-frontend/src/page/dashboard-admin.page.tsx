import {useEffect, useState} from "react";
import {BookIcon, BookOpenIcon, FileTextIcon, HomeIcon, UsersIcon,} from "lucide-react";
import {Tabs} from "@/components/ui/tabs.tsx";
import {Candidate} from "@/types/Candidate.ts";
import candidateService from "@/service/candidate.service.ts";
import {toast} from "sonner";
import {Toaster} from "@/components/ui/sonner.tsx";
import Sidebar from "@/components/dashboard-admin/Sidebar.tsx";
import HeaderDashboard from "@/components/dashboard-admin/header-dashboard.tsx";
import {GetCandidateColumns} from "@/components/dashboard-admin/candidate/columns-candidate.tsx";
import CandidatesTabContent from "@/components/dashboard-admin/candidate/candidate-tab-content.tsx";
import FormersTabContent from "@/components/dashboard-admin/former/former-tab-content.tsx";
import {Former} from "@/types/Former.ts";
import {GetFormerColumns} from "@/components/dashboard-admin/former/columns-former.tsx";
import formerService from "@/service/former.service.ts";
import ClassesTabContent from "@/components/dashboard-admin/classe/classe-tab-content.tsx";
import {GetClassesColumns} from "@/components/dashboard-admin/classe/columns-classe.tsx";
import {Path} from "@/types/Path.ts";
import classeService from "@/service/classe.service.ts";
import {useStore} from "@/store/use-store.ts";
import {GetCentersColumns} from "@/components/dashboard-admin/center/columns-center.tsx";
import {Center} from "@/types/Center.ts";
import centerService from "@/service/center.service.ts";
import CenterTabContent from "@/components/dashboard-admin/center/center-tab-content.tsx";
import {Form} from "@/types/Form.ts";
import {GetFormColumns} from "@/components/dashboard-admin/form/columns-form.tsx";
import FormTabContent from "@/components/dashboard-admin/form/form-tab-content.tsx";

const DashboardAdminPage = () => {
    const menuItems = [
        {id: "candidates", label: "Candidats", icon: UsersIcon},
        {id: "classes", label: "Classes", icon: BookOpenIcon},
        {id: "formers", label: "Formateurs", icon: BookIcon},
        {id: "centers", label: "Centers", icon: HomeIcon},
        {id: "forms", label: "Forms", icon: FileTextIcon},
    ];

    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [formers, setFormers] = useState<Former[]>([]);
    const [classes, setClasses] = useState<Path[]>([]);
    const [centers, setCenters] = useState<Center[]>([]);
    const [forms, setForms] = useState<Form[]>([]);

    const [created, setCreated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    const {activeTab, setActiveTab} = useStore();

    const candidateColumns = GetCandidateColumns({candidates, setCandidates});
    const formerColumns = GetFormerColumns({formers, setFormers});
    const classColumns = GetClassesColumns({classes, setClasses});
    const centerColumns = GetCentersColumns({centers, setCenters})
    const formColumns = GetFormColumns({forms, setForms});


    const fetchFormers = async () => {
        setIsLoading(true);
        try {
            const resp = await formerService.getAll();
            setFormers(resp.data)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
    const fetchCandidate = async () => {
        setIsLoading(true);
        try {
            const resp = await candidateService.getAll();
            setCandidates(resp.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    const fetchClasses = async () => {
        setIsLoading(true);
        try {
            const resp = await classeService.getAll();
            console.log(resp.data)
            setClasses(resp.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    const fetchCenters = async () => {
        setIsLoading(true);
        try {
            const resp = await centerService.getAll();
            setCenters(resp.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }
    const fetchForms = async () => {
        setIsLoading(true);
        try {
            const resp = await formerService.getAll();
            setForms(resp.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSuccessCandidate = (isSuccess: boolean) => {
        if (isSuccess && !created) {

            toast.success("Nouveau candidat!.");
            fetchCandidate()
            setCreated(true);

            setTimeout(() => {
                setCreated(false);
            }, 10000);
        } else {
            toast.error("Erreur lors de la création du candidat");
            setCreated(false);
        }
    }
    const handleSuccessFormer = (isSuccess: boolean) => {
        if (isSuccess && !created) {

            toast.success("Nouveau formateur !");
            fetchFormers()
            setCreated(true);

            setTimeout(() => {
                setCreated(false);
            }, 10000);
        } else {
            toast.error("Erreur lors de la création du formateur");
            setCreated(false);
        }
    }
    const handleSuccessClasse = (isSuccess: boolean) => {
        if (isSuccess && !created) {

            toast.success("Nouvelle classe !");
            fetchClasses();
            setCreated(true);
            setTimeout(() => {
                setCreated(false);
            }, 10000);
        } else {
            toast.error("Erreur lors de la création d'un classe");
            setCreated(false);
        }
    }
    const handleSuccessCenter = (isSuccess: boolean) => {
        if (isSuccess && !created) {

            toast.success("Nouveau centre !");
            fetchCenters()
            setCreated(true);
            setTimeout(() => {
                setCreated(false);
            }, 10000);
        } else {
            toast.error("Erreur lors de la création d'un centre");
            setCreated(false);
        }
    }
    const handleSuccessForm = (isSuccess: boolean) => {
        if (isSuccess && !created) {
            toast.success("Nouveau formulaire !");
            fetchForms()
            setCreated(true);
            setTimeout(() => {
                setCreated(false);
            }, 10000);
            //TODO:  ajouter une redirection vers l'édition de formulaire
        } else {
            toast.error("Erreur lors de la création d'un formulaire");
            setCreated(false);
        }
    }

// TODO: handle SSE from server, maybe is useless
//     useEffect(() => {
//         if (created) {
//             return;
//         }
//
//         const eventSource = new EventSource(
//             "http://localhost:8081/api/v1/sse/events"
//         );
//
//         eventSource.addEventListener("update", (event) => {
//             console.log("updated: " + event.data);
//             setIsLoading(true);
//             setTimeout(() => {
//                 console.log("update DB");
//                 switch (activeTab) {
//                     case menuItems[0].id:
//                         fetchCandidate();
//                         break;
//                     case menuItems[1].id:
//                         fetchClasses();
//                         break;
//                     case menuItems[2].id:
//                         fetchFormers();
//                         break;
//                     case menuItems[3].id:
//                         fetchCenters();
//                         break;
//                     case menuItems[4].id:
//                         fetchForms();
//                         break;
//                 }
//             }, 5000)
//         });
//
//         return () => {
//             setIsLoading(false);
//             eventSource.close();
//         };
//     }, [activeTab, created]);

    useEffect(() => {
        console.log(activeTab)
        switch (activeTab) {
            case menuItems[0].id:
                fetchCandidate();
                break;
            case menuItems[1].id:
                fetchClasses();
                break;
            case menuItems[2].id:
                fetchFormers();
                break;
            case menuItems[3].id:
                fetchCenters();
                break;
            case menuItems[4].id:
                fetchForms();
                break;
        }
    }, [activeTab]);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} menuItems={menuItems}/>
            <main className="flex-1 overflow-y-auto">
                <HeaderDashboard menuItems={menuItems} activeTab={activeTab}/>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* // ! MenuContext change with tab */}
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-4"
                    >
                        {/*TODO: need to add affected Path*/}
                        <CandidatesTabContent
                            columns={candidateColumns}
                            candidates={candidates}
                            isLoading={isLoading}
                            handleSuccess={handleSuccessCandidate}
                        />
                        <FormersTabContent
                            columns={formerColumns}
                            formers={formers}
                            isLoading={isLoading}
                            handleSuccess={handleSuccessFormer}
                        />

                        {/* FIX: Create classe change */}
                        <ClassesTabContent
                            columns={classColumns}
                            classes={classes}
                            isLoading={isLoading}
                            handleSuccess={handleSuccessClasse}
                        />
                        <CenterTabContent
                            columns={centerColumns}
                            centers={centers}
                            isLoading={isLoading}
                            handleSuccess={handleSuccessCenter}
                        />

                        {/* ! handle Former in back to recive only lastname ? */}
                        <FormTabContent
                            columns={formColumns}
                            forms={forms}
                            isLoading={isLoading}
                            handleSuccess={handleSuccessForm}
                        />
                    </Tabs>
                </div>
            </main>
            <Toaster/>
        </div>
    );
};

export default DashboardAdminPage;
