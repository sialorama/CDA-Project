import {useParams} from "react-router-dom";

const CandidateDetailsPage = () => {
    const {candidateId} = useParams();

    return (
        <div>
            Page candidate details
            <p>Candidate Id: {candidateId}</p>
        </div>
    );
};

export default CandidateDetailsPage;
