import pandas as pd
import json

# Load CSV files
names_df = pd.read_csv("names.csv")
details_df = pd.read_csv("details.csv")

# Initialize dictionary
names_dict = {}

# Process names
for _, row in names_df.iterrows():
    nationality = row["Nationality"]
    gender = row["Gender"] if row["Gender"] in ["Male", "Female"] else "None"  # Last names go under "None"
    name_type = row["Type"]  # "First" or "Last"
    name = row["Name"]

    # Ensure nationality exists
    if nationality not in names_dict:
        names_dict[nationality] = {"Male": {"First": []}, "Female": {"First": []}, "None": {"Last": []}}

    # Store names in the correct category
    if name_type == "First":
        names_dict[nationality][gender]["First"].append(name)
    elif name_type == "Last":
        names_dict[nationality]["None"]["Last"].append(name)

# **Remove empty "Last" arrays from Male/Female categories**
for nationality in names_dict.keys():
    for gender in ["Male", "Female"]:
        if "Last" in names_dict[nationality][gender]:  # Remove if "Last" is empty
            del names_dict[nationality][gender]["Last"]

# Process details
jobs = details_df[details_df["Type"] == "Job"]["Title"].tolist()
degrees = details_df[details_df["Type"] == "Degree"]["Title"].tolist()

# Combin