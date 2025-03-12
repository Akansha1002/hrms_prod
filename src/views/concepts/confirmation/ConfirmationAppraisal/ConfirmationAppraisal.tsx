import AppraisalCommentTableSection from "./components/AppraisalCommentTableSection"
import AppraisalRatingTableSection from "./components/AppraisalRatingTableSection"
import EmployeeDetailSection from "./components/EmployeeDetailSection"
import { AppraisalCommentField, AppraisalRatingField } from "./types"

const appraisalCommentField: AppraisalCommentField[] = [
    { goals: "", achievements: "", approverComments: "" }
]

const appraisalRatingField: AppraisalRatingField[] = [
    { skills: "Job Knowledge", selfRating: "", ratingComments: "" },
    { skills: "Productivity", selfRating: "", ratingComments: "" },
    { skills: "Work Quality", selfRating: "", ratingComments: "" },
    { skills: "Technical Skills", selfRating: "", ratingComments: "" },
    { skills: "Creativity", selfRating: "", ratingComments: "" },
    { skills: "Helping Others", selfRating: "", ratingComments: "" },
    { skills: "Knowledge Sharing", selfRating: "", ratingComments: "" },
    { skills: "Punctuality/Attendance", selfRating: "", ratingComments: "" },
]

const ConfirmationAppraisal = () => {
    return (
        <div className="flex flex-col gap-4">
            <EmployeeDetailSection />
            <AppraisalCommentTableSection data={appraisalCommentField} />
            <AppraisalRatingTableSection data={appraisalRatingField} />
        </div>
    )
}

export default ConfirmationAppraisal