import {useParams} from "react-router-dom";
import {useStore} from "@/store/use-store.ts";

const CandidatePage = () => {
    const {candidateId} = useParams();

    const token = useStore((state) => state.token);
    const isConnected = useStore((state) => state.isConnected);

    const role = useStore((state) => state.role);

    return (
        <div>
            {isConnected ? (
                <>
                <span>
                    candidateId: {candidateId}
                </span>
                    <span>
                    token: {token}
                </span>
                    <div>
                        Mon role est <span>{role}</span>
                    </div>
                </>
            ) : "ceci est la page Candidat"}
        </div>
    );
};

export default CandidatePage;
