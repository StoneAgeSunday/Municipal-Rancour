CREATE TABLE Finances(
    municipality TEXT NOT NULL,
    financial_period INTEGER NOT NULL,
    financial_year_end INTEGER NOT NULL,
    dataset TEXT NOT NULL,
    metric_code TEXT NOT NULL,
    value REAL,
    PRIMARY KEY (municipality, financial_period, financial_year_end, dataset, metric_code),
    FOREIGN KEY (dataset)
        REFERENCES Datasets(dataset_short_name)
            ON UPDATE CASCADE,
    FOREIGN KEY (metric_code)
        REFERENCES Metrics(metric_code)
            ON UPDATE CASCADE,
    FOREIGN KEY (municipality)
        REFERENCES Municipaities(municipality_name)
            ON UPDATE CASCADE
);

CREATE TABLE Municipalities(
    demarcation_code TEXT NOT NULL PRIMARY KEY,
    municipality_name TEXT NOT NULL,
    municipality_type TEXT NOT NULL,
    parent_municipality_code TEXT NOT NULL,
    province_code TEXT NOT NULL,
    FOREIGN KEY (municipality_type)
        REFERENCES Municipality_Categories(category_code)
            ON UPDATE CASCADE,
    FOREIGN KEY (province_code)
        REFERENCES Provinces(province_code)
            ON UPDATE CASCADE,
    UNIQUE(municipality_name)
);

CREATE TABLE Metrics(
    dataset TEXT NOT NULL,
    metric_code TEXT NOT NULL,
    metric_name TEXT NOT NULL,
    PRIMARY KEY(metric_code, dataset),
    FOREIGN KEY (dataset)
        REFERENCES Datasets(dataset_short_name)
            ON UPDATE CASCADE

);

CREATE TABLE Datasets
(
    dataset_long_name TEXT NOT NULL PRIMARY KEY,
    dataset_short_name TEXT NOT NULL,
    UNIQUE(dataset_short_name)
);

CREATE TABLE Municipality_Categories
(
    category_code TEXT NOT NULL PRIMARY KEY,
    category_name TEXT NOT NULL,
    UNIQUE(category_name)
);

CREATE TABLE Provinces
(
    province_code TEXT NOT NULL PRIMARY KEY,
    province_name TEXT NOT NULL,
    UNIQUE(province_name)
);
