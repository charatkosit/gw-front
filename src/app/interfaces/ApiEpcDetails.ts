export interface ApiEpcDetails {
    errorCode:   string;
    message:     string;
    resultFound: string;
    data:        EpcDetails[];
}

export interface EpcDetails {
    crf_id:       number;
    crf_partid:   string;
    crf_pnc:      string;
    crf_count:    number;
    crf_cat:      string;
    crf_model:    string;
    crf_year:     string;
    crf_details:  string;
}
