export interface CVDet {
    identifier: string;
    ready: boolean;
    failed: boolean;
    file_name: string;
    name: CVName;
    phone_numbers: string[];
    websites: string[];
    emails: string[];
    date_of_birth: string;
    location: CVLocation;
    objective: string;
    summary: string;
    education: CVEducation[];
    work_experience: CVWorkExp[];
    skills: string[];
    certifications: string[];
    publications: string[];
    referees: string[];
    sections: CVSections[];
}

export interface CVName {
    raw: string;
    first: string;
    last: string;
    middle: string;
    title: string;
}

export interface CVLocation {
    formatted: string;
    postal_code: string;
    state: string;
    country: string;
    raw_input: string;
}

export interface CVEducation {
    organization: string;
    accreditation: CVEducAccreditation;
    grade: CVEduGrade;
    location: CVLocation;
    dates: CVEduDates;
}

export interface CVEducAccreditation {
    education: string;
    input_str: string;
    match_str: string;
    education_level: string;
}

export interface CVEduGrade {
    raw: string;
    metric: string;
    value: string;
}

export interface CVEduDates{
    completionDate: string;
    isCurrent: boolean;
}

export interface CVWorkExp{
    job_title: string;
    organization: string;
    location: CVLocation;
    dates: CVWorkExpDates;
    job_description: string;
}

export interface CVWorkExpDates{
    start_date: string;
    end_date: string;
    months_in_position: number;
    isCurrent: boolean;
}

export interface CVSections{
    section_type: string;
    bbox: number[];
    page_index: number;
    text: string;
}