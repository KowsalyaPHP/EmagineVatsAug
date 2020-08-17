export class EduGrid{     
    Passing_Year:string;  
    Marks_Obtained:string;  
    Degree_Awarded:string;  
    Institution:string;  
}  
export class EmpGrid{     
    From_Date:string;  
    Until_Date:string;  
    Employer:string;  
    Role:string;  
}  
export class PreScreeningQuestionGrid{     
    
    Question:string;      
    QuesId:string;
    QnOrder:string;
    QnType:string;  
    Content:string;
    Applicant?: boolean;
    mandatory?: boolean;
    Interviewer?: boolean;
}  
