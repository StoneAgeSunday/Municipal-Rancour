CREATE TABLE Finances(
    municipality TEXT NOT NULL,
    financial_period INTEGER NOT NULL,
    financial_year_end INTEGER NOT NULL,
    metric_code TEXT NOT NULL,
    value REAL,
    PRIMARY KEY (municipality, financial_period, financial_year_end, metric_code),
    FOREIGN KEY (metric_code)
        REFERENCES Metrics (item_code),
    FOREIGN KEY (municipality)
        REFERENCES Municipaities (municipality)
);

CREATE TABLE Municipalities(
    municipality TEXT NOT NULL PRIMARY KEY,
    municipality_type TEXT NOT NULL
);

CREATE TABLE Metrics(
    metric_code TEXT NOT NULL,
    dataset TEXT NOT NULL,
    metric_name TEXT NOT NULL,
    PRIMARY KEY(metric_code, dataset)
);
