/* NBRO Project Register - Executive Dashboard & Project Management System */
const API_URL = "https://script.google.com/macros/s/AKfycbxxbM1pNLKYYWdDtdHPBg8ycXfrHCx_Qwr4we1KiogjBt9Wg6ukI9XRG8YJH3TnFMoAJQ/exec";

// EMBEDDED SEED DATABASE FOR INSTANT ZERO-LATENCY DISPLAY
const BUNDLED_DATABASE = {"projects": [{"Project Code": "27224.B1", "Client": "RDA", "Description": "Detailed Engineering Desingn -Central Expressway Section 3 Package1(3+440 KM to 12+890KM)", "Working Group": "Mihira", "Responsible Engineer": "Gayathri", "Initial Estimate": 26922500, "Advance Amount": 0, "Advance Received": "", "Status": "In Progress"}, {"Project Code": 27795, "Client": "RDA", "Description": "Consultancy Supervision (geotechnical work) of CEP section 3", "Working Group": "Mihira", "Responsible Engineer": "Gayathri", "Initial Estimate": "", "Advance Amount": "", "Advance Received": "", "Status": "Completed"}, {"Project Code": "27623.a", "Client": "Prison Head Quarters", "Description": "Construction of Boundry wall at Kegalle Prison (Supervision)", "Working Group": "Mihira", "Responsible Engineer": "Dulan", "Initial Estimate": 1949085.77, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28021, "Client": "200 Mn", "Description": "Construction Supervision - RLVMMP", "Working Group": "Nirmanthi", "Responsible Engineer": "Narmada", "Initial Estimate": "", "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": "27693.a", "Client": "DNCWS", "Description": "Stabilisation of failed slope behind the community water supply scheme at menikkandarawa mahapallegama, in Kagalle District", "Working Group": "Nirmanthi", "Responsible Engineer": "Narmada", "Initial Estimate": 1900000, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28133, "Client": "ICC- Finex", "Description": "Site No.74 Installation and Monitoring", "Working Group": "Suranga", "Responsible Engineer": "", "Initial Estimate": 3760000, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28152, "Client": "RDA", "Description": "G.I. at CEP Section 3 - Package 2(Geotechnical Investigation)", "Working Group": "Suranga", "Responsible Engineer": "", "Initial Estimate": "", "Advance Amount": 152995000, "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28292, "Client": "Mr.Rathnagoda", "Description": "Design report of retaining wall at Pitagaldeniya , Kegalla", "Working Group": "Mihira", "Responsible Engineer": "Sadani", "Initial Estimate": 224500, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": "26215.k", "Client": "AIIB", "Description": "RLVMMP Additional Sites Package 10 (J-Q) (Surveying, Investigation, Design)", "Working Group": "Mihira", "Responsible Engineer": "", "Initial Estimate": "", "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28331, "Client": "HSD", "Description": "Indian Housing Project", "Working Group": "Nirmanthi", "Responsible Engineer": "", "Initial Estimate": 13515750, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28259, "Client": "RR Construction", "Description": "Instrumantation of railway mainline (site 130,133,134,135)", "Working Group": "Suranga", "Responsible Engineer": "", "Initial Estimate": 8630000, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28411, "Client": "NWS & DB", "Description": "Boundry wall at Ambathale Water Treatment Plant", "Working Group": "Mihira", "Responsible Engineer": "Darsha", "Initial Estimate": 1345000, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28503, "Client": "Bope DS", "Description": "Design submission for approval Justin Kandan", "Working Group": "Mihira", "Responsible Engineer": "Poorni", "Initial Estimate": "", "Advance Amount": "", "Advance Received": "", "Status": "Completed"}, {"Project Code": 28564, "Client": "GG", "Description": "Dithwa Syclone - RDA Roads", "Working Group": "Mihira", "Responsible Engineer": "", "Initial Estimate": "", "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28555, "Client": "RLVMMP", "Description": "School Project", "Working Group": "Nirmanthi", "Responsible Engineer": "", "Initial Estimate": "", "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28566, "Client": "Urban Council Seethawakumbura", "Description": "Rectification of slope instabilization at Seethalena road near Awissawella rest house", "Working Group": "Nirmanthi", "Responsible Engineer": "Narmada", "Initial Estimate": 722174.7, "Advance Amount": "", "Advance Received": "", "Status": "Completed"}, {"Project Code": 28594, "Client": "Government Grant Mitigation", "Description": "Procurement of Balangoda Goragala Rock Fall", "Working Group": "Nirmanthi", "Responsible Engineer": "Narmada", "Initial Estimate": 319611, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": "28425.A", "Client": "Uva Wellassa University", "Description": "Geotechnical Investgation at University of Uva Wellassa - Technology facuilty", "Working Group": "Suranga", "Responsible Engineer": "Narmada", "Initial Estimate": "", "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": "28425.B", "Client": "Uva Wellassa University", "Description": "Geotechnical Investgation at University of Uva Wellassa - Hostel Complex", "Working Group": "Suranga", "Responsible Engineer": "Akila", "Initial Estimate": "", "Advance Amount": "", "Advance Received": "", "Status": "Completed"}, {"Project Code": 28458, "Client": "Ole spring bottles (Pvt) Ltd", "Description": "Geotechnical Investigation at Ole spring bottles (Pvt) Ltd.", "Working Group": "Suranga", "Responsible Engineer": "Akila", "Initial Estimate": "", "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28571, "Client": "Maharagama Urban Council", "Description": "Retaining wall construction at Talapathpitiya", "Working Group": "Nirmanthi", "Responsible Engineer": "Narmada", "Initial Estimate": "", "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28033, "Client": "GG", "Description": "Pahala Kadugannawa Rock Blasting", "Working Group": "Suranga", "Responsible Engineer": "", "Initial Estimate": "", "Advance Amount": "", "Advance Received": "", "Status": "Completed"}, {"Project Code": 28205, "Client": "HSD", "Description": "Clearance - No.96, Manning Place, Colombo 06", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 54368.79, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28226, "Client": "HSD", "Description": "Clearance - Ragama", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 46861.82, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28239, "Client": "HSD", "Description": "Clearance - Dickmans Road", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 98312, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28349, "Client": "HSD", "Description": "Clearance - Galleface Tereace", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 80333, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28250, "Client": "HSD", "Description": "Clearance - Janaki Jane", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 98301, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28265, "Client": "HSD", "Description": "Clearance - Charls Way", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 84424.36, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28392, "Client": "HSPTD", "Description": "Clearance - Dehiwala", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 150586, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28532, "Client": "HSD", "Description": "Clearance - Sea Veiw avenue", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 232659, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28568, "Client": "HSD", "Description": "Clearance - IBC ROAD", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 68151, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": "28598. A", "Client": "HSD", "Description": "Clearance -Poruthota", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 299406, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": "28598. D", "Client": "HSD", "Description": "Clearance -Moors Road", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 80544, "Advance Amount": "", "Advance Received": "", "Status": "Completed"}, {"Project Code": 28430, "Client": "Uva Province", "Description": "G.I for Uva Provincial Council Building", "Working Group": "", "Responsible Engineer": "Narmada", "Initial Estimate": 1260500, "Advance Amount": 585000, "Advance Received": "", "Status": "Completed"}, {"Project Code": 28596, "Client": "RDA", "Description": "Inclusive Conectivity and Development Project", "Working Group": "Mihira", "Responsible Engineer": "Dulan", "Initial Estimate": 1378625, "Advance Amount": 689312.5, "Advance Received": "", "Status": "Completed"}, {"Project Code": 28613, "Client": "Nipon Hotel, Ella", "Description": "Slope stability Assessment- Nipon Hotel, Ella", "Working Group": "Mihira", "Responsible Engineer": "Sasith", "Initial Estimate": 155000, "Advance Amount": 75000, "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28623, "Client": "NIFS", "Description": "NIFS - Phase II", "Working Group": "Nirmanthi", "Responsible Engineer": "Imalsha", "Initial Estimate": "", "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28615, "Client": "OPEC", "Description": "Re instatement of road damages caused by Dithwa under OPEC Badulla - Chenkaladi Road", "Working Group": "Mihira", "Responsible Engineer": "Lakshan", "Initial Estimate": 145000, "Advance Amount": 145000, "Advance Received": "", "Status": "In Progress"}, {"Project Code": "28294.A", "Client": "Yatiyanthota PS", "Description": "Post Contract stage of Yatiyanthota PS- Rock fall", "Working Group": "Nirmanthi", "Responsible Engineer": "Narmada", "Initial Estimate": 150000, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28616, "Client": "Airport Aviation Service (Pvt)Ltd", "Description": "Repair of Acess Road to Redar Complex at Piduruthalagala ", "Working Group": "Mihira", "Responsible Engineer": "Lahiru", "Initial Estimate": "", "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28626, "Client": "RDA", "Description": "Kahathuduwa System Interchange", "Working Group": "Suranga", "Responsible Engineer": "Narmada", "Initial Estimate": "", "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28583, "Client": "HSD", "Description": "Clearance -Dutugemunu Street", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 112455.1, "Advance Amount": "", "Advance Received": "", "Status": "Completed"}, {"Project Code": "28598.B", "Client": "HSD", "Description": "Clearance -No.175. Baudhdhaloka Mawatha ", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 134660, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": "28598.E", "Client": "HSD", "Description": "Clearance -ICBT, Nugegoda", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 119983, "Advance Amount": "", "Advance Received": "", "Status": "Completed"}, {"Project Code": "28598.G", "Client": "HSD", "Description": "Clearance -Kularathna Mawatha, Colombo 10", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 98450, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": "28598.J", "Client": "HSD", "Description": "Clearance -No.5A, Alfred Road, Colombo 03", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 87167, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": "28598.K", "Client": "HSD", "Description": "Clearance -Nawala Road, Rajagiriya", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 82069, "Advance Amount": "", "Advance Received": "", "Status": "Completed"}, {"Project Code": "28598.L", "Client": "HSD", "Description": "No.43, Moors Road", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 85889, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": "28598.M", "Client": "HSD", "Description": "Clearance -No.68, Dharmapala Mawatha, ", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 87213, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": "28598.O", "Client": "HSD", "Description": "Clearance -No.55, Mirihana Rd, Nugegoda", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 92232, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": "28598.P", "Client": "HSD", "Description": "Clearance -No.380/1, Baudhaloka Mawatha, Colombo 07", "Working Group": "Sanchitha", "Responsible Engineer": "Darsha", "Initial Estimate": 356134, "Advance Amount": "", "Advance Received": "", "Status": "In Progress"}, {"Project Code": 28690, "Client": "UDA", "Description": "Methotamulla Urban Park", "Working Group": "Sanchitha", "Responsible Engineer": "Ranjan", "Initial Estimate": 2665000, "Advance Amount": 0, "Advance Received": "", "Status": "In Progress"}], "wip": [{"Update ID": "", "Project ID": "26215.k", "Project Code": "26215.k", "Reporting Month": "2026-06", "Physical WIP %": 0, "Financial WIP": 22224, "Remarks": "", "Updated By": "Mr. Ranjan", "Updated At": "2026-09-01T11:32:12.738Z", "Monthly Progress": 22224, "Working Progress": 22224, "Advance Received": 2222, "Prev Cumulative": 0, "Total Cumulative": 22224}, {"Update ID": "", "Project ID": "26215.k", "Project Code": "26215.k", "Reporting Month": "2026-07", "Physical WIP %": 0, "Financial WIP": 222225, "Remarks": "", "Updated By": "Mr. Ranjan", "Updated At": "2026-09-01T11:33:42.041Z", "Monthly Progress": 222225, "Working Progress": 222225, "Advance Received": 0, "Prev Cumulative": 22224, "Total Cumulative": 244449}, {"Update ID": "", "Project ID": "27224.B1", "Project Code": "27224.B1", "Reporting Month": "2026-06", "Physical WIP %": 0, "Financial WIP": 222224, "Remarks": "", "Updated By": "Mr. Ranjan", "Updated At": "2026-09-01T11:31:11.680Z", "Monthly Progress": 222224, "Working Progress": 222224, "Advance Received": 0, "Prev Cumulative": 0, "Total Cumulative": 222224}, {"Update ID": "", "Project ID": "27623.a", "Project Code": "27623.a", "Reporting Month": "2026-06", "Physical WIP %": 0, "Financial WIP": 1210, "Remarks": "", "Updated By": "Mr. Ranjan", "Updated At": "2026-09-01T10:53:45.695Z", "Monthly Progress": 1210, "Working Progress": 1210, "Advance Received": 0, "Prev Cumulative": 0, "Total Cumulative": 1210}, {"Update ID": "", "Project ID": "27224.B1", "Project Code": "27224.B1", "Reporting Month": "2026-07", "Physical WIP %": 0, "Financial WIP": 333334, "Remarks": "", "Updated By": "Mr. Ranjan", "Updated At": "2026-09-01T11:33:50.674Z", "Monthly Progress": 333334, "Working Progress": 333334, "Advance Received": 0, "Prev Cumulative": 444448, "Total Cumulative": 777782}], "financeSummary": [{"Reporting Month": "2026-01", "Expenditure": 22134786, "Money Received": 392018.71, "Outstanding": 628000, "Interdivisional": 0, "Working Progress": 0, "Income": 1020018.71, "Profit": -21115767.29, "Profit %": -2070.14, "Remarks": "", "Updated At": "2026-08-29T15:49:24.669Z"}, {"Reporting Month": "2026-02", "Expenditure": 19840211, "Money Received": 163520.43, "Outstanding": 0, "Interdivisional": 0, "Working Progress": 0, "Income": 163520.43, "Profit": -19676690.57, "Profit %": -12033.17, "Remarks": "", "Updated At": "2026-08-28T09:46:41.539Z"}, {"Reporting Month": "2026-03", "Expenditure": 30338366, "Money Received": 80257.5, "Outstanding": 961467.85, "Interdivisional": 0, "Working Progress": 0, "Income": 1041725.35, "Profit": -29296640.65, "Profit %": -2812.32, "Remarks": "", "Updated At": "2026-08-28T09:47:59.200Z"}, {"Reporting Month": "2026-04", "Expenditure": 37947534, "Money Received": 703770.13, "Outstanding": 2648936, "Interdivisional": 0, "Working Progress": 0, "Income": 3352706.13, "Profit": -34594827.87, "Profit %": -1031.85, "Remarks": "", "Updated At": "2026-08-28T09:49:23.815Z"}, {"Reporting Month": "2026-05", "Expenditure": 33452974, "Money Received": 64712.29, "Outstanding": 1536422.99, "Interdivisional": 0, "Working Progress": 0, "Income": 1601135.28, "Profit": -31851838.72, "Profit %": -1989.33, "Remarks": "", "Updated At": "2026-08-28T09:50:07.252Z"}, {"Reporting Month": "2026-06", "Expenditure": 45780140, "Money Received": 11957.71, "Outstanding": 859854.77, "Interdivisional": 0, "Working Progress": 0, "Income": 871812.48, "Profit": -44908327.52, "Profit %": -5151.15, "Remarks": "", "Updated At": "2026-08-28T09:50:55.438Z"}, {"Reporting Month": "2026-07", "Expenditure": 50137224, "Money Received": 103212.03, "Outstanding": 1333195.61, "Interdivisional": 0, "Working Progress": 0, "Income": 1436407.6400000001, "Profit": -48700816.36, "Profit %": -3390.46, "Remarks": "", "Updated At": "2026-08-28T09:52:40.207Z"}], "finance": [], "lookups": {"statuses": ["In Progress", "Completed"], "workingGroups": ["Mihira", "Nirmanthi", "Suranga", "Sanchitha"], "engineers": ["Gayathri", "Dulan", "Narmada", "Sadani", "Darsha", "Poorni", "Akila", "Sasith", "Imalsha", "Lakshan", "Lahiru", "Ranjan"]}, "reportingMonth": "2026-06", "users": [{"epf": 926, "title": "Mr.", "shortName": "Ranjan", "fullName": "Ranjan Weerasinghe", "email": "ranjan.weerasinghe@gmail.com", "position": "Scientist", "workingGroup": "Leader ", "role": "Admin", "status": "Active", "hasPassword": true, "lastLogin": "2026-09-01T11:38:08.855Z", "createdAt": "2026-08-28T04:38:51.398Z"}, {"epf": 784, "title": "Mr.", "shortName": "Suranga", "fullName": "Suranga Dissanayaka", "email": "", "position": "Senior Scientist", "workingGroup": "Leader", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "2026-08-28T05:31:28.275Z", "createdAt": "2026-08-28T04:54:12.258Z"}, {"epf": 1351, "title": "Mrs.", "shortName": "Thakshila", "fullName": "A.K.A.T. NAYOMI", "email": "", "position": "MA Tech", "workingGroup": "", "role": "Viewer", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 698, "title": "Mrs.", "shortName": "Menaka", "fullName": "E.P. Menaka Samanmali", "email": "", "position": "MA Non Tech", "workingGroup": "", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1043, "title": "Miss.", "shortName": "", "fullName": "G.N.D. Rajapaksha", "email": "", "position": "Junior Manager", "workingGroup": "", "role": "Viewer", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 556, "title": "Mrs.", "shortName": "Nishanthi", "fullName": "K.M.D. NISHANTHI", "email": "", "position": "Junior Manager", "workingGroup": "", "role": "Viewer", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1044, "title": "Mrs.", "shortName": "", "fullName": "P.H.D.K. Hettiarachchi", "email": "", "position": "MA Tech", "workingGroup": "", "role": "Viewer", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 947, "title": "Mrs.", "shortName": "Samadhi", "fullName": "A.Dinesha Samadhi", "email": "", "position": "MA Tech", "workingGroup": "", "role": "Viewer", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 919, "title": "Dr.", "shortName": "Sanchitha", "fullName": "Sanchitha Jayakody", "email": "", "position": "Director", "workingGroup": "Leader", "role": "Admin", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 552, "title": "Mrs.", "shortName": "Sewwandi", "fullName": "G.D.C. Sewwandi", "email": "", "position": "MA Non Tech", "workingGroup": "", "role": "Viewer", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 349, "title": "Mrs.", "shortName": "", "fullName": "S.D. Rajapaksha", "email": "", "position": "Junior Manager", "workingGroup": "", "role": "Viewer", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1312, "title": "Mrs.", "shortName": "Lakshika", "fullName": "S.D.M.L.V. Senevirathne", "email": "", "position": "Junior Manager", "workingGroup": "", "role": "Viewer", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1027, "title": "Mrs.", "shortName": "Mihirani", "fullName": "R.L.D. Mihirani", "email": "", "position": "MA Non Tech", "workingGroup": "", "role": "Viewer", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 918, "title": "Dr.", "shortName": "Mihira", "fullName": "Mihira Lakruwan", "email": "", "position": "Senior Scientist", "workingGroup": "Leader", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1081, "title": "Mrs.", "shortName": "Amali", "fullName": "N.P.G.Amali", "email": "", "position": "Scientist", "workingGroup": "Leader", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1089, "title": "Mrs.", "shortName": "Gayathri", "fullName": "D.G.G.K.Somarathna", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1188, "title": "Ms.", "shortName": "Dharsha", "fullName": "D. M. D. T. Dasanayaka", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 655, "title": "Mr. ", "shortName": "Ravindra", "fullName": "B.M.R.K.Balassoriya", "email": "", "position": "Senior Scientist", "workingGroup": "Leader", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 788, "title": "Ms.", "shortName": "Nirmanthi", "fullName": "I.A.N.D.Idirimanna", "email": "", "position": "Senior Scientist", "workingGroup": "Leader", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 770, "title": "Ms.", "shortName": "Narmada", "fullName": "U.L.N.I. Liyanage", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 656, "title": "Mr. ", "shortName": "Lasantha", "fullName": "N.W.L.B.Nawarathna", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1435, "title": "Ms.", "shortName": "Ishanka", "fullName": "K.K.D.I.Chathurangi", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1504, "title": "Mr. ", "shortName": "Tharaka", "fullName": "U.G.K.T.Dissanayake", "email": "", "position": "Midle Manager", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1438, "title": "", "shortName": "Sadani", "fullName": "H.W.S.D. Hewawasam", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1437, "title": "", "shortName": "Imalsha", "fullName": "W.C.M.Imalsha", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1483, "title": "", "shortName": "", "fullName": "R.J.P.N.K.Ranathunga", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1484, "title": "", "shortName": "", "fullName": "A.H.T.A.S.Hewage", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1681, "title": "", "shortName": "", "fullName": "L.T.Nanayakkara", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1682, "title": "", "shortName": "", "fullName": "R.K.Nuwan Tharanga", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1665, "title": "", "shortName": "", "fullName": "A.M.C.B.Attanayake", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1354, "title": "Mr. ", "shortName": "Lahiru", "fullName": "P.A.D.L.S.Chandrasiri", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 838, "title": "", "shortName": "", "fullName": "P.G.D.S.Jayawickrama", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 659, "title": "Ms.", "shortName": "Chandima", "fullName": "Chandima Adeysinghe", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1573, "title": "", "shortName": "", "fullName": "S.A.Darmadasa", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1697, "title": "Ms.", "shortName": "Ashini", "fullName": "D.G.M.Ashini Godagampola", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1696, "title": "", "shortName": "", "fullName": "W.A.G.P.Senarathna", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1716, "title": "Mr. ", "shortName": "Lasindu", "fullName": "M.G.Lasindu Chathurya", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}, {"epf": 1704, "title": "", "shortName": "", "fullName": "K.S.Hewanayaka", "email": "", "position": "Scientist", "workingGroup": "Member", "role": "Editor", "status": "Active", "hasPassword": false, "lastLogin": "", "createdAt": ""}]};

const state = {
  projects: [],
  wip: [],
  financeSummary: [],
  finance: [],
  lookups: { statuses: [], workingGroups: [], engineers: [] },
  month: "2026-06",
  user: null,
  token: null,
  knownUsers: [],
  matrixViewMode: "table"
};
window.state = state;

const $ = id => document.getElementById(id) || {
  value: "",
  innerHTML: "",
  textContent: "",
  style: {},
  classList: { add: () => {}, remove: () => {}, toggle: () => {} },
  addEventListener: () => {},
  appendChild: () => {},
  getContext: () => null,
  showModal: () => {},
  close: () => {}
};

const parseNum = v => {
  if (typeof v === "number") return isNaN(v) ? 0 : v;
  if (!v) return 0;
  const clean = String(v).replace(/,/g, "").trim();
  const n = parseFloat(clean);
  return isNaN(n) ? 0 : n;
};

const formatInputCurrency = (v, minDecimals = 0) => {
  const n = parseNum(v);
  if (n === 0 && (v === "" || v === null || v === undefined)) return "";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: 2
  });
};

const money = n => {
  const num = parseNum(n);
  return "Rs. " + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
const moneyShort = n => {
  const num = parseNum(n);
  return "Rs. " + num.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};
const pct = n => Math.max(0, Math.min(100, parseNum(n) * (parseNum(n) > 1 ? 1 : 100)));
const safe = v => v == null ? "" : String(v);

function projectCode(p) { return safe(p["Project Code"] ?? p.projectCode ?? p["No"] ?? p.no); }
function projectId(p) { return safe(p["Project ID"] ?? p.projectId ?? p.id) || projectCode(p); }
function status(p) { return safe(p["Current Status"] ?? p.Status ?? p.status) || "In Progress"; }
function scientist(p) { return safe(p["Responsible Scientist"] ?? p["Responsible Engineer"] ?? p.responsibleScientist ?? p.responsibleEngineer ?? p["Scientist"] ?? p.scientist) || ""; }
function projectLeader(p) { return safe(p["Project Leader"] ?? p["Group Leader"] ?? p.projectLeader ?? p.groupLeader ?? p.leader) || ""; }
function registeredYear(p) {
  if (!p) return "";
  let raw = safe(p["Registered Year"] ?? p.registeredYear ?? p["Year"] ?? p.year ?? p["Reg Year"] ?? p["Date"] ?? p["Start Date"] ?? "").trim();
  if (raw) {
    if (raw.includes("-")) return raw.split("-")[0];
    if (raw.includes("/")) return raw.split("/")[0];
    if (/^\d{4}$/.test(raw)) return raw;
  }
  return "2026";
}
window.registeredYear = registeredYear;

function isExcludedSupportStaff(u) {
  if (!u) return true;
  const pos = String(u.position || u["Position"] || "").trim().toLowerCase();
  const grp = String(u.workingGroup || u["Working Group"] || "").trim().toLowerCase();
  // MA Tech, MA Non Tech, Junior Manager (JM) are not eligible as leaders or project scientists
  if (pos.includes("ma tech") || pos.includes("ma non tech") || pos.includes("junior manager") || pos.includes("jm") || pos.includes("management assistant") || pos.includes("technical assistant")) {
    return true;
  }
  return false;
}

function isStaffLeader(u) {
  if (!u || isExcludedSupportStaff(u)) return false;
  const grp = String(u.workingGroup || u["Working Group"] || u["Working group"] || u.group || "").trim().toLowerCase();
  return grp.includes("leader");
}

function isStaffEligibleEngineer(u) {
  if (!u || isExcludedSupportStaff(u)) return false;
  const grp = String(u.workingGroup || u["Working Group"] || u["Working group"] || u.group || "").trim().toLowerCase();
  if (grp === "support") return false;
  const pos = String(u.position || u["Position"] || "").trim().toLowerCase();
  return grp.includes("member") || grp.includes("leader") || pos.includes("scientist") || pos.includes("engineer");
}

/* OFFICIAL INSTITUTIONAL SENIORITY HIERARCHY */
function getStaffHierarchyRank(u) {
  if (!u) return 99;
  const pos = String(u.position || u["Position"] || "").trim().toLowerCase();
  if (pos.includes("director")) return 1;
  if (pos.includes("senior scientist")) return 2;
  if (pos.includes("scientist") || pos.includes("engineer")) return 3;
  if (pos.includes("middle manager") || (pos.includes("manager") && !pos.includes("junior"))) return 4;
  if (pos.includes("junior manager") || pos.includes("jm")) return 5;
  if (pos.includes("ma tech") || pos.includes("technical assistant") || (pos.includes("ma") && pos.includes("tech"))) return 6;
  if (pos.includes("ma non tech") || pos.includes("management assistant") || pos.includes("non tech")) return 7;
  return 8;
}

function compareStaffByHierarchy(a, b) {
  const rankA = getStaffHierarchyRank(a);
  const rankB = getStaffHierarchyRank(b);
  if (rankA !== rankB) return rankA - rankB;
  const nameA = String(a?.shortName || a?.fullName || a?.email || "").trim();
  const nameB = String(b?.shortName || b?.fullName || b?.email || "").trim();
  return nameA.localeCompare(nameB);
}

/* INSTITUTIONAL NBRI PROFESSIONAL RANK SYMBOLS */
function getStaffRankIcon(u) {
  if (!u) return "🔬";
  const pos = String(u.position || u["Position"] || "").trim().toLowerCase();
  if (pos.includes("director")) return "🏛️";
  if (pos.includes("senior scientist")) return "👔";
  if (pos.includes("scientist") || pos.includes("engineer")) return "🔬";
  if (pos.includes("middle manager") || (pos.includes("manager") && !pos.includes("junior"))) return "📊";
  if (pos.includes("junior manager") || pos.includes("jm")) return "💼";
  if (pos.includes("ma tech") || pos.includes("technical assistant") || (pos.includes("ma") && pos.includes("tech"))) return "🛠️";
  if (pos.includes("ma non tech") || pos.includes("management assistant") || pos.includes("non tech")) return "🗂️";
  return "👤";
}

function findStaffByEpfOrName(val) {
  if (!val) return null;
  let raw = String(val).trim().toLowerCase();
  if (!raw) return null;

  // Handle common phonetic/typing variations in legacy spreadsheets
  if (raw === "darsha") raw = "dharsha";
  if (raw === "somarathna" || raw === "somarathne") raw = "gayathri";

  // 1. Try EPF number extraction (3 to 5 digits)
  const epfMatch = raw.match(/\b(\d{3,5})\b/);
  if (epfMatch) {
    const targetEpf = epfMatch[1];
    const foundByEpf = (state.knownUsers || []).find(u => u && String(u.epf || "").trim() === targetEpf);
    if (foundByEpf) return foundByEpf;
  }

  // 2. Try exact and fuzzy name/email match
  return (state.knownUsers || []).find(u => {
    if (!u) return false;
    const epf = String(u.epf || "").trim().toLowerCase();
    const full = String(u.fullName || "").trim().toLowerCase();
    const short = String(u.shortName || "").trim().toLowerCase();
    const email = String(u.email || "").trim().toLowerCase();

    if (epf && (epf === raw || raw === `epf: ${epf}` || raw === `epf:${epf}`)) return true;
    if (email && email === raw) return true;
    if (short && short.length >= 3 && (short === raw || raw.includes(short) || short.includes(raw))) return true;
    if (full && full.length >= 4 && (full === raw || raw.includes(full) || full.includes(raw))) return true;
    return false;
  }) || null;
}

function parseStaffList(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.filter(Boolean);
  const str = String(raw).trim();
  if (!str) return [];
  return str.split(/[,/&+]|\band\b/i).map(s => s.trim()).filter(Boolean);
}

function staffDisplayName(identifier) {
  if (!identifier) return "";
  const list = parseStaffList(identifier);
  if (!list.length) return "";
  return list.map(item => {
    const user = findStaffByEpfOrName(item);
    if (user) {
      const prefix = user.title ? user.title + " " : "";
      const name = user.shortName || user.fullName || user.email;
      return `${prefix}${name}`.trim();
    }
    return String(item).replace(/^EPF:\s*\d+\s*\|\s*/i, "").trim();
  }).join(", ");
}

function staffBadges(identifier, icon = "🔬") {
  if (!identifier) return `<span style="color:var(--text-muted);font-size:11px;">Unassigned</span>`;
  let list = parseStaffList(identifier);
  if (!list.length) return `<span style="color:var(--text-muted);font-size:11px;">Unassigned</span>`;

  // Sort multi-staff badges in institutional hierarchy order
  list.sort((a, b) => {
    const uA = findStaffByEpfOrName(a);
    const uB = findStaffByEpfOrName(b);
    return compareStaffByHierarchy(uA || { shortName: a }, uB || { shortName: b });
  });

  const badges = list.map(item => {
    const user = findStaffByEpfOrName(item);
    if (user) {
      const useIcon = getStaffRankIcon(user);
      const prefix = user.title ? user.title + " " : "";
      const name = user.shortName || user.fullName || user.email;
      return `
        <span class="staff-badge" title="${safe(user.position || 'Staff')} (${safe(user.fullName || name)})" style="display:inline-flex;align-items:center;gap:3px;font-size:11px;font-weight:600;color:var(--text-primary);padding:2px 6px;background:var(--bg-surface-subtle);border:1px solid var(--border-color);border-radius:4px;white-space:nowrap;line-height:1.2;">
          <span style="font-size:11px;">${useIcon}</span>
          <span>${safe(prefix + name)}</span>
        </span>
      `;
    }
    const cleanName = String(item).replace(/^EPF:\s*\d+\s*\|\s*/i, "").trim();
    return `<span class="staff-badge" style="display:inline-flex;align-items:center;gap:3px;font-size:11px;font-weight:600;padding:2px 6px;background:var(--bg-surface-subtle);border:1px solid var(--border-color);border-radius:4px;white-space:nowrap;line-height:1.2;"><span>${icon}</span><span>${safe(cleanName)}</span></span>`;
  }).join("");

  return `<div class="staff-badges-wrap" style="display:flex;flex-wrap:wrap;gap:4px;max-width:180px;align-items:center;">${badges}</div>`;
}

function staffBadge(identifier, icon = "🔬") {
  return staffBadges(identifier, icon);
}

function reportingMonth(r) {
  if (!r) return "";
  let raw = safe(r["Reporting Month"] ?? r.reportingMonth ?? r.month ?? r["Month"]).trim();
  if (!raw) return "";
  const mMatch = raw.replace(/\//g, "-").match(/^(\d{4})-(\d{1,2})/);
  if (mMatch) {
    const y = mMatch[1];
    const m = mMatch[2].padStart(2, "0");
    return `${y}-${m}`;
  }
  const d = new Date(raw);
  if (!isNaN(d.getTime())) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    if (y >= 2000 && y <= 2100) return `${y}-${m}`;
  }
  return raw;
}
function norm(c) {
  return String(c ?? "").trim().toLowerCase().replace(/\s+/g, "").replace(/\.0+$/, "");
}

function getWipRow(pOrCodeOrId, month = state.month) {
  if (!pOrCodeOrId) return null;
  const targetM = (month || "").trim();
  let codes = [];
  if (typeof pOrCodeOrId === "object") {
    codes.push(norm(projectCode(pOrCodeOrId)));
    codes.push(norm(projectId(pOrCodeOrId)));
    codes.push(norm(pOrCodeOrId["No"] || pOrCodeOrId["no"]));
  } else {
    codes.push(norm(pOrCodeOrId));
  }
  codes = codes.filter(Boolean);

  return state.wip.find(x => {
    const xCode = norm(x["Project Code"] ?? x.projectCode ?? x["No"] ?? x.no ?? x["Project ID"] ?? x.projectId);
    const xId = norm(x["Project ID"] ?? x.projectId);
    const m = reportingMonth(x);
    const match = codes.some(c => c && (xCode === c || xId === c || xCode.startsWith(c) || c.startsWith(xCode)));
    return match && m === targetM;
  }) || null;
}

function getLastWipRow(pOrCodeOrId, beforeMonth = state.month) {
  if (!pOrCodeOrId) return null;
  const targetM = (beforeMonth || "").trim();
  let codes = [];
  if (typeof pOrCodeOrId === "object") {
    codes.push(norm(projectCode(pOrCodeOrId)));
    codes.push(norm(projectId(pOrCodeOrId)));
    codes.push(norm(pOrCodeOrId["No"] || pOrCodeOrId["no"]));
  } else {
    codes.push(norm(pOrCodeOrId));
  }
  codes = codes.filter(Boolean);

  const priorRows = state.wip.filter(x => {
    const xCode = norm(x["Project Code"] ?? x.projectCode ?? x["No"] ?? x.no ?? x["Project ID"] ?? x.projectId);
    const xId = norm(x["Project ID"] ?? x.projectId);
    const m = reportingMonth(x);
    const match = codes.some(c => c && (xCode === c || xId === c || xCode.startsWith(c) || c.startsWith(xCode)));
    return match && m && m < targetM;
  });
  if (!priorRows.length) return null;
  priorRows.sort((a, b) => reportingMonth(b).localeCompare(reportingMonth(a)));
  return priorRows[0];
}

function physicalValue(r) {
  if (!r) return 0;
  const v = r["Physical WIP %"] ?? r.physicalWip ?? r.physical ?? r.value;
  const n = parseNum(v);
  return n > 1 ? n / 100 : n;
}

function workingProgressValue(r) {
  if (!r) return 0;
  return parseNum(r["Monthly Progress"] ?? r["Working Progress"] ?? r["Financial WIP"] ?? r.workingProgress ?? r.financialWip ?? r.financial ?? r.value ?? 0);
}

function estimateValue(p) {
  return parseNum(p["Estimate (Without Tax)"] ?? p.estimateWithoutTax ?? p["Estimate"] ?? p["Initial Estimate"] ?? 0);
}

function advanceValue(p, month = state.month) {
  const r = getWipRow(projectCode(p) || projectId(p), month);
  if (r && (r["Advance Received"] != null || r.advanceReceived != null)) {
    return parseNum(r["Advance Received"] ?? r.advanceReceived);
  }
  return parseNum(p["Advance Amount"] ?? p.advance ?? 0);
}

function prevCumulativeValue(p, month = state.month) {
  const code = projectCode(p);
  const cNorm = norm(code);
  const pIdNorm = norm(projectId(p));
  const targetM = (month || "").trim();

  // 1. Historical baseline if defined
  const base = parseNum(p["Prev Cumulative"] ?? p["Cumulative Up to 2024"] ?? p.prevCumulative ?? 0);

  // 2. Sum all previous recorded months strictly prior to target month
  const priorRows = state.wip.filter(x => {
    const xCode = norm(x["Project Code"] ?? x.projectCode ?? x["No"] ?? x.no ?? x["Project ID"] ?? x.projectId);
    const xId = norm(x["Project ID"] ?? x.projectId);
    const codeMatch = (cNorm && (xCode === cNorm || xId === cNorm)) || (pIdNorm && (xCode === pIdNorm || xId === pIdNorm));
    const m = reportingMonth(x);
    return codeMatch && m && m < targetM;
  });

  const sumPrior = priorRows.reduce((sum, r) => sum + workingProgressValue(r), 0);

  const currentR = getWipRow(code || projectId(p), month);
  if (currentR && currentR["Prev Cumulative"] != null && !sumPrior) {
    const explicit = parseNum(currentR["Prev Cumulative"]);
    if (explicit > 0) return explicit;
  }

  return base + sumPrior;
}

function getCurrentUserDisplayName() {
  if (!state.user) return "Staff";
  const u = state.user;
  const title = u.title ? `${u.title} ` : "";
  const name = u.shortName || u.fullName || u.email || "Staff";
  return `${title}${name}`.trim();
}

function totalCumulativeValue(p, month = state.month) {
  const r = getWipRow(projectCode(p), month);
  const wp = r ? workingProgressValue(r) : 0;
  return prevCumulativeValue(p, month) + wp;
}

function getDivisionFinance(month = state.month) {
  const targetM = (month || "").trim();
  const found = state.financeSummary.find(f => reportingMonth(f) === targetM);
  const projectsTotalWp = state.projects.reduce((sum, p) => sum + workingProgressValue(getWipRow(projectCode(p), month)), 0);

  if (found) {
    const exp = parseNum(found["Expenditure"] || found["Total Expenditure"] || found.expenditure || 0);
    const subcontract = parseNum(found["Subcontract Payment"] || found["Subcontractor Payment"] || found.subcontractPayment || 0);
    const rawDivExp = found["Division Expenditure"] !== undefined && found["Division Expenditure"] !== "" && found["Division Expenditure"] !== null ? parseNum(found["Division Expenditure"]) : null;
    const divExp = (rawDivExp !== null && rawDivExp !== 0) ? rawDivExp : Math.max(0, exp - subcontract);
    const mr = parseNum(found["Money Received"] || found.moneyReceived || 0);
    const out = parseNum(found["Outstanding"] || found.outstanding || 0);
    const inter = parseNum(found["Interdivisional"] || found.interdivisional || 0);
    const wp = parseNum(found["Working Progress"] || found.workingProgress || 0) || projectsTotalWp;
    const income = parseNum(found["Income"] || found.income || 0) || (wp > 0 ? wp : (mr + out));
    const profit = found["Profit"] !== undefined && found["Profit"] !== "" && found["Profit"] !== null ? parseNum(found["Profit"]) : (income - exp - inter);
    const profitPct = income > 0 ? (profit / income) * 100 : (parseNum(found["Profit %"]) || 0);

    return {
      hasData: true,
      expenditure: exp,
      subcontractPayment: subcontract,
      divisionExpenditure: divExp,
      moneyReceived: mr,
      outstanding: out,
      interdivisional: inter,
      workingProgress: wp,
      income,
      profit,
      profitPct,
      remarks: found["Remarks"] || found.remarks || "",
      updatedBy: found["Updated By"] || found.updatedBy || "",
      updatedAt: found["Updated At"] || found.updatedAt || ""
    };
  }

  // Baseline from project sums when no entry recorded yet
  const exp = 0, subcontract = 0, divExp = 0, mr = 0, out = 0, inter = 0;
  const income = projectsTotalWp;
  const profit = income;
  const profitPct = income > 0 ? 100 : 0;
  return { hasData: false, expenditure: exp, subcontractPayment: subcontract, divisionExpenditure: divExp, moneyReceived: mr, outstanding: out, interdivisional: inter, workingProgress: projectsTotalWp, income, profit, profitPct, remarks: "", updatedBy: "", updatedAt: "" };
}

function currentWip(pOrCode, month = state.month) {
  const p = (typeof pOrCode === "object") ? pOrCode : (state.projects.find(x => norm(projectCode(x)) === norm(pOrCode) || norm(projectId(x)) === norm(pOrCode)) || { "Project Code": pOrCode });
  const r = getWipRow(p, month);
  const last = getLastWipRow(p, month);

  const hasMonthData = Boolean(r && (
    (r["Monthly Progress"] != null && String(r["Monthly Progress"]).trim() !== "") ||
    (r["Working Progress"] != null && String(r["Working Progress"]).trim() !== "") ||
    (r["Physical WIP %"] != null && String(r["Physical WIP %"]).trim() !== "") ||
    (r["Advance Received"] != null && String(r["Advance Received"]).trim() !== "") ||
    (r["Remarks"] != null && String(r["Remarks"]).trim() !== "") ||
    r.monthlyProgress != null || r.workingProgress != null || r.physicalWip != null
  ));

  const fin = r ? workingProgressValue(r) : 0;
  const phys = r ? physicalValue(r) : 0;
  const adv = advanceValue(p, month);
  const prev = prevCumulativeValue(p, month);
  const tot = prev + (hasMonthData ? fin : 0);

  return {
    hasMonthData,
    physical: phys,
    financial: fin,
    advance: adv,
    prevCum: prev,
    totalCum: tot,
    remarks: r ? safe(r["Remarks"] ?? r.remarks ?? "") : "",
    updatedBy: r ? safe(r["Updated By"] ?? r.updatedBy ?? r["Updated by"] ?? "") : "",
    updatedAt: r ? safe(r["Updated At"] ?? r.updatedAt ?? r["Updated at"] ?? "") : "",
    lastMonth: last ? reportingMonth(last) : "",
    lastFinancial: last ? workingProgressValue(last) : 0,
    lastPhysical: last ? physicalValue(last) : 0
  };
}

function cumulative(code, month = state.month) {
  const cNorm = norm(code);
  const rows = state.wip.filter(x => norm(x["Project Code"] ?? x.projectCode) === cNorm && reportingMonth(x) <= month);
  let physical = 0, financial = 0;
  for (const r of rows) {
    physical += physicalValue(r);
    financial += workingProgressValue(r);
  }
  return { physical, financial };
}

/* NOTIFICATION TOAST */
function showToast(message, isError = false) {
  const t = $("toast");
  if (!t) return;
  t.textContent = (isError ? "⚠️ " : "✓ ") + message;
  t.style.background = isError ? "var(--danger)" : "var(--header-bg)";
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3500);
}

/* THEME ENGINE */
function initTheme() {
  const saved = localStorage.getItem("nbro_theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const curr = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const next = curr === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("nbro_theme", next);
  updateThemeIcon(next);
  renderExecutiveCharts();
}

function updateThemeIcon(theme) {
  const btn = $("themeToggle");
  if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
}

/* API CLIENT */
async function apiGet(action, params = {}, timeoutMs = 45000) {
  const url = new URL(API_URL);
  url.searchParams.set("action", action);
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v); });
  
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url.toString(), { cache: "no-store", redirect: "follow", signal: controller.signal });
    clearTimeout(timer);
    if (!response.ok) throw new Error(`API GET failed: ${response.status}`);
    const data = await response.json();
    if (data.success === false || data.ok === false) throw new Error(data.error || data.message || "API request failed");
    return data;
  } catch(e) {
    clearTimeout(timer);
    throw e;
  }
}

async function apiPost(action, payload = {}, timeoutMs = 45000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const authFields = {
      token: state.token || "",
      userRole: state.user ? (state.user.role || "") : "",
      userEmail: state.user ? (state.user.email || "") : "",
      userEpf: state.user ? (state.user.epf || "") : ""
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, ...authFields, ...payload }),
      redirect: "follow",
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!response.ok) throw new Error(`API POST failed: ${response.status}`);
    const data = await response.json();
    if (data.success === false || data.ok === false) throw new Error(data.error || data.message || "API request failed");
    return data;
  } catch(e) {
    clearTimeout(timer);
    throw e;
  }
}

function deriveLookups() {
  const unique = (...fields) => [...new Set(state.projects.map(p => {
    for (const f of fields) { if (p[f]) return safe(p[f]); }
    return "";
  }).filter(Boolean))].sort((a,b)=>a.localeCompare(b));

  const foundStatuses = unique("Current Status", "Status", "status");
  state.lookups.statuses = foundStatuses.length ? foundStatuses : ["In Progress", "Completed", "Pending", "On Hold"];
  state.lookups.workingGroups = unique("Working Group");
  state.lookups.engineers = unique("Responsible Scientist", "Responsible Engineer", "Scientist", "Engineer");

  const foundYears = [...new Set(state.projects.map(p => registeredYear(p)).filter(Boolean))].sort().reverse();
  state.lookups.years = foundYears.length ? foundYears : ["2026", "2025", "2024", "2023"];
}



async function init() {
  initTheme();

  // Invalidate stale or empty browser cache from previous versions
  const CACHE_VERSION = "v9.3.0";
  try {
    const savedVer = localStorage.getItem("nbri_cache_version");
    if (savedVer !== CACHE_VERSION) {
      localStorage.removeItem("nbri_cached_bootstrap");
      localStorage.removeItem("nbro_known_users");
      localStorage.setItem("nbri_cache_version", CACHE_VERSION);
    }
  } catch (e) {}

  // Load from local storage cache, or instantly fall back to bundled seed
  let initial = null;
  try {
    const cachedStr = localStorage.getItem("nbri_cached_bootstrap");
    if (cachedStr) {
      const parsed = JSON.parse(cachedStr);
      if (Array.isArray(parsed.projects) && parsed.projects.length > 0) {
        initial = parsed;
      }
    }
  } catch (e) {}

  if (!initial || !Array.isArray(initial.projects) || initial.projects.length === 0) {
    initial = BUNDLED_DATABASE;
  }

  // SYNCHRONOUS INSTANT RENDER (0ms)
  state.projects = (Array.isArray(initial.projects) && initial.projects.length > 0) ? initial.projects : (BUNDLED_DATABASE.projects || []);
  state.wip = (Array.isArray(initial.wip) && initial.wip.length > 0) ? initial.wip : (BUNDLED_DATABASE.wip || []);
  state.financeSummary = (Array.isArray(initial.financeSummary) && initial.financeSummary.length > 0) ? initial.financeSummary : (BUNDLED_DATABASE.financeSummary || []);
  state.finance = initial.finance || [];
  state.lookups = initial.lookups || {};
  state.month = initial.reportingMonth || state.month || "2026-06";
  state.knownUsers = (Array.isArray(initial.users) && initial.users.length > 0) ? initial.users : (BUNDLED_DATABASE.users || []);

  deriveLookups();
  if ($("reportMonth")) $("reportMonth").value = state.month;
  if ($("wipMonth")) $("wipMonth").value = state.month;
  fillFilters();
  renderAll();
  setSheetsStatus("live", `Live (${state.projects.length} Projects)`);
  setTimeout(renderExecutiveCharts, 100);
  setTimeout(renderExecutiveCharts, 400);

  // BACKGROUND ASYNC LIVE SYNC WITH GOOGLE SHEETS
  try {
    const res = await apiGet("all", {}, 45000);
    const projs = Array.isArray(res.projects) ? res.projects : (Array.isArray(res.data) ? res.data : null);

    if (Array.isArray(projs) && projs.length > 0) {
      state.projects = projs;
      if (Array.isArray(res.wip) && res.wip.length > 0) state.wip = res.wip;
      if (Array.isArray(res.financeSummary) && res.financeSummary.length > 0) state.financeSummary = res.financeSummary;
      if (Array.isArray(res.finance) && res.finance.length > 0) state.finance = res.finance;
      if (Array.isArray(res.unlockRequests)) {
        state.unlockRequests = res.unlockRequests;
        saveGovernanceData();
        updateApprovalBadge();
      }
      state.lookups = res.lookups || {};
      state.month = res.reportingMonth || state.month;
      if (Array.isArray(res.users) && res.users.length > 0) {
        state.knownUsers = res.users;
        localStorage.setItem("nbro_known_users", JSON.stringify(res.users));
      }

      // Save fresh bundle to instant cache
      localStorage.setItem("nbri_cached_bootstrap", JSON.stringify({
        projects: state.projects,
        wip: state.wip,
        financeSummary: state.financeSummary,
        finance: state.finance,
        unlockRequests: state.unlockRequests,
        lookups: state.lookups,
        reportingMonth: state.month,
        users: state.knownUsers
      }));

      deriveLookups();
      if ($("reportMonth")) $("reportMonth").value = state.month;
      if ($("wipMonth")) $("wipMonth").value = state.month;
      fillFilters();
      renderAll();
      setSheetsStatus("live", `Live Database (${state.projects.length} Projects)`);
      setApiStatus(`Live database connected (${state.projects.length} Projects)`, true);
    }
  } catch (err) {
    console.warn("[NBRI] Central Database background sync:", err.message);
    if (state.projects.length > 0) {
      setSheetsStatus("live", `Live (${state.projects.length} Projects)`);
    } else {
      setSheetsStatus("error", "Offline");
    }
  }
}
function setSheetsStatus(state, label) {
  // state: 'connecting' | 'live' | 'offline' | 'error'
  const pill = $("sheetsStatusPill");
  const dot  = $("sheetsStatusDot");
  const lbl  = $("sheetsStatusLabel");
  if (!pill) return;

  // Remove all state classes
  pill.classList.remove("sheets-status-connecting", "sheets-status-live", "sheets-status-offline", "sheets-status-error");
  pill.classList.add(`sheets-status-${state}`);
  if (lbl) lbl.textContent = label;

  const titles = {
    connecting: "Connecting to central database…",
    live:       "Live • Central database connected",
    offline:    "Offline • Using cached local data",
    error:      "Notice • Cannot reach central database"
  };
  pill.title = titles[state] || label;
}

function setApiStatus(message, good) {
  // Update the topbar pill
  if (good === true)        setSheetsStatus("live",    "Live Database");
  else if (good === false)  setSheetsStatus("offline", "Offline");
  else                      setSheetsStatus("error",   "Error");

  // Keep bottom-right legacy indicator
  let el = $("apiStatus");
  if (!el) {
    el = document.createElement("div");
    el.id = "apiStatus";
    el.style.cssText = "position:fixed;right:18px;bottom:18px;z-index:9999;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:600;background:var(--bg-surface);color:var(--text-primary);box-shadow:var(--shadow-lg);border:1px solid var(--border-color);display:flex;align-items:center;gap:6px;";
    document.body.appendChild(el);
  }
  el.innerHTML = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${good ? '#10b981' : '#ef4444'};"></span> ${message}`;
  setTimeout(() => { if (el) el.style.display = "none"; }, 5000);
}

function fillFilters() {
  const staffList = (state.knownUsers || []).slice().sort(compareStaffByHierarchy);
  
  // Eligible staff: exclude MA Tech, MA Non Tech, Junior Manager (JM)
  const eligibleStaff = staffList.filter(u => isStaffEligibleEngineer(u));
  const leadersList = staffList.filter(u => isStaffLeader(u));

  // Staff options for general filters (Title + Short Name)
  const filterStaffOptionsHtml = '<option value="">All scientists / engineers</option>' + eligibleStaff.map(u => {
    const titleStr = u.title ? `${u.title} ` : "";
    const nameStr = u.shortName || u.fullName || u.email;
    const val = u.epf || nameStr;
    return `<option value="${safe(val)}">${safe(titleStr + nameStr)}</option>`;
  }).join("");

  for (const [id, arr, label] of [
    ["yearFilter", state.lookups.years || [], "All registered years"],
    ["financeYearFilter", state.lookups.years || [], "All registered years"],
    ["statusFilter", state.lookups.statuses || [], "All statuses"],
    ["groupFilter", state.lookups.workingGroups || [], "All working groups"],
    ["financeGroupFilter", state.lookups.workingGroups || [], "All working groups"]
  ]) {
    if ($(id)) {
      const curr = $(id).value;
      $(id).innerHTML = `<option value="">${label}</option>` + arr.map(x => `<option value="${safe(x)}" ${x === curr ? 'selected' : ''}>${safe(x)}</option>`).join("");
    }
  }

  if ($("engineerFilter")) $("engineerFilter").innerHTML = filterStaffOptionsHtml;
  if ($("matrixScientistFilter")) $("matrixScientistFilter").innerHTML = filterStaffOptionsHtml;

  if ($("matrixGroupFilter")) {
    $("matrixGroupFilter").innerHTML = `<option value="">All working groups</option>` + (state.lookups.workingGroups || []).map(x => `<option value="${safe(x)}">${safe(x)}</option>`).join("");
  }

  // 1. Working Group Dropdown in Add/Edit Project (Working Group Leaders from USER profile)
  if ($("fGroup")) {
    $("fGroup").innerHTML = '<option value="">Select Working Group Leader…</option>' + leadersList.map(l => {
      const titleStr = l.title ? `${l.title} ` : "";
      const nameStr = l.shortName || l.fullName || l.email;
      const sName = l.shortName || (l.fullName ? l.fullName.split(" ")[0] : nameStr);
      const icon = getStaffRankIcon(l);
      return `<option value="${safe(sName)}">${icon} ${safe(titleStr + nameStr)} (${safe(l.position || 'Leader')})</option>`;
    }).join("");
  }

  // 2. Render Multi-Engineer Checklist (Eligible Scientists / Engineers)
  renderEngineerChecklist($("fEngineer")?.value ? parseStaffList($("fEngineer").value) : []);

  if ($("fStatus")) $("fStatus").innerHTML = (state.lookups.statuses || []).map(x => `<option value="${safe(x)}">${safe(x)}</option>`).join("");
  if ($("existingCodesList")) {
    $("existingCodesList").innerHTML = state.projects.map(p => `<option value="${safe(projectCode(p))}">${safe(p["Client"])} - ${safe(p["Description"])}</option>`).join("");
  }
}

function renderEngineerChecklist(selectedValues = []) {
  const checkListEl = $("fEngineerCheckList");
  const badgesEl = $("fEngineerSelectedBadges");
  const hiddenInput = $("fEngineer");
  if (!checkListEl || !badgesEl) return;

  const staffList = (state.knownUsers || []).slice().sort(compareStaffByHierarchy);
  // Exclude MA Tech / JM grade
  const eligibleStaff = staffList.filter(u => isStaffEligibleEngineer(u));

  const normalizedSelected = (Array.isArray(selectedValues) ? selectedValues : parseStaffList(selectedValues)).map(s => {
    const u = findStaffByEpfOrName(s);
    return u ? String(u.epf) : String(s).trim().toLowerCase();
  });

  checkListEl.innerHTML = eligibleStaff.map(u => {
    const epf = String(u.epf || "");
    const titleStr = u.title ? `${u.title} ` : "";
    const nameStr = u.shortName || u.fullName || u.email;
    const isLead = isStaffLeader(u);
    const icon = getStaffRankIcon(u);
    const leadTag = isLead ? " • Leader" : "";
    const isChecked = normalizedSelected.includes(epf) || normalizedSelected.includes((u.shortName || "").toLowerCase()) || normalizedSelected.includes((u.fullName || "").toLowerCase());
    const val = u.shortName || u.fullName || nameStr;

    return `
      <label class="staff-check-item">
        <input type="checkbox" data-staff-epf="${safe(epf)}" data-staff-val="${safe(val)}" ${isChecked ? 'checked' : ''} onchange="handleEngineerCheckboxChange()">
        <span>${icon} <b>${safe(titleStr + nameStr)}</b> <span style="font-size:10px;color:var(--text-muted);">${safe(u.position || 'Scientist')}${leadTag}</span></span>
      </label>
    `;
  }).join("");

  updateEngineerBadgesAndInput();
}

function handleEngineerCheckboxChange() {
  updateEngineerBadgesAndInput();
}

function updateEngineerBadgesAndInput() {
  const checkListEl = $("fEngineerCheckList");
  const badgesEl = $("fEngineerSelectedBadges");
  const hiddenInput = $("fEngineer");
  if (!checkListEl || !badgesEl || !hiddenInput) return;

  const checkedBoxes = Array.from(checkListEl.querySelectorAll("input[type='checkbox']:checked"));
  const selectedVals = checkedBoxes.map(cb => cb.dataset.staffVal || cb.dataset.staffEpf);
  hiddenInput.value = selectedVals.join(", ");

  badgesEl.innerHTML = selectedVals.map(val => {
    const user = findStaffByEpfOrName(val);
    const title = user && user.title ? user.title + " " : "";
    const name = user ? (user.shortName || user.fullName) : val.replace(/^EPF:\s*\d+\s*\|\s*/i, "");
    const icon = getStaffRankIcon(user);
    return `
      <span class="staff-chip" style="font-size:11.5px;padding:3px 8px;">
        <span>${icon}</span>
        <span><b>${safe(title + name)}</b></span>
        <button type="button" class="remove-chip-btn" onclick="removeEngineerChip('${safe(val)}', event)" title="Remove">✕</button>
      </span>
    `;
  }).join("");
}

function removeEngineerChip(epfOrVal, event) {
  if (event) {
    event.stopPropagation();
  }
  const checkListEl = $("fEngineerCheckList");
  if (!checkListEl) return;
  const target = String(epfOrVal).trim().toLowerCase();
  checkListEl.querySelectorAll("input[type='checkbox']").forEach(cb => {
    const cbEpf = (cb.dataset.staffEpf || "").toLowerCase();
    const cbVal = (cb.dataset.staffVal || "").toLowerCase();
    if (cbEpf === target || cbVal === target || cbVal.includes(target)) {
      cb.checked = false;
    }
  });
  updateEngineerBadgesAndInput();
}

function toggleEngineerDropdown(e) {
  if (e) {
    if (e.target.closest(".remove-chip-btn")) return;
    e.stopPropagation();
  }
  const panel = $("fEngineerDropdownPanel");
  const arrow = $("engineerDropdownArrow");
  if (!panel) return;
  const isHidden = panel.style.display === "none";
  panel.style.display = isHidden ? "block" : "none";
  if (arrow) arrow.textContent = isHidden ? "▴" : "▾";
}

document.addEventListener("click", e => {
  const wrap = $("engineerMultiselectWrap");
  const panel = $("fEngineerDropdownPanel");
  if (panel && wrap && !wrap.contains(e.target)) {
    panel.style.display = "none";
    if ($("engineerDropdownArrow")) $("engineerDropdownArrow").textContent = "▾";
  }
});

window.toggleEngineerDropdown = toggleEngineerDropdown;
window.handleEngineerCheckboxChange = handleEngineerCheckboxChange;
window.removeEngineerChip = removeEngineerChip;

function getFilteredProjects() {
  const q = ($("search")?.value || "").toLowerCase().trim();
  const yf = ($("yearFilter")?.value || "").trim();
  const sf = ($("statusFilter")?.value || "").toLowerCase().trim();
  const gf = ($("groupFilter")?.value || "").toLowerCase().trim();
  const ef = ($("engineerFilter")?.value || "").toLowerCase().trim();
  const sortMode = ($("projectSortFilter")?.value || "code_asc").toLowerCase().trim();

  const filtered = (state.projects || []).filter(p => {
    // 1. Registered Year Match
    if (yf) {
      const pYear = registeredYear(p);
      if (pYear !== yf) return false;
    }

    // 2. Text Search (matches code, client, description, scientists, leaders, year)
    if (q) {
      const txt = `${projectCode(p)} ${registeredYear(p)} ${p["Client"]} ${p["Description"]} ${scientist(p)} ${staffDisplayName(scientist(p))} ${projectLeader(p)} ${staffDisplayName(projectLeader(p))}`.toLowerCase();
      if (!txt.includes(q)) return false;
    }

    // 3. Status Match
    if (sf) {
      const pStatus = status(p).toLowerCase().trim();
      if (pStatus !== sf && !pStatus.includes(sf) && !sf.includes(pStatus)) return false;
    }

    // 4. Working Group Match
    if (gf) {
      const pGrp = String(p["Working Group"] || "").toLowerCase().trim();
      if (pGrp !== gf && !pGrp.includes(gf) && !gf.includes(pGrp)) return false;
    }

    // 5. Scientist / Engineer Match
    if (ef) {
      const scList = parseStaffList(scientist(p));
      const match = scList.some(s => {
        const u = findStaffByEpfOrName(s);
        if (u) {
          return String(u.epf).toLowerCase() === ef || 
                 (u.shortName && u.shortName.toLowerCase() === ef) || 
                 (u.fullName && u.fullName.toLowerCase().includes(ef)) ||
                 ef.includes(String(u.epf).toLowerCase()) ||
                 ef.includes((u.shortName || "").toLowerCase()) ||
                 ef.includes((u.fullName || "").toLowerCase());
        }
        return s.toLowerCase().includes(ef) || ef.includes(s.toLowerCase());
      });
      if (!match) return false;
    }

    return true;
  });

  // Apply Sorting
  filtered.sort((a, b) => {
    if (sortMode === "code_desc") {
      return projectCode(b).localeCompare(projectCode(a), undefined, { numeric: true, sensitivity: 'base' });
    } else if (sortMode === "year_desc") {
      return registeredYear(b).localeCompare(registeredYear(a)) || projectCode(a).localeCompare(projectCode(b), undefined, { numeric: true, sensitivity: 'base' });
    } else if (sortMode === "year_asc") {
      return registeredYear(a).localeCompare(registeredYear(b)) || projectCode(a).localeCompare(projectCode(b), undefined, { numeric: true, sensitivity: 'base' });
    } else if (sortMode === "client_asc") {
      return String(a["Client"] || "").localeCompare(String(b["Client"] || ""));
    } else if (sortMode === "status_asc") {
      return status(a).localeCompare(status(b));
    } else if (sortMode === "group_asc") {
      return String(a["Working Group"] || "zzz").localeCompare(String(b["Working Group"] || "zzz"));
    } else if (sortMode === "scientist_asc") {
      const sA = staffDisplayName(scientist(a)) || scientist(a) || "zzz";
      const sB = staffDisplayName(scientist(b)) || scientist(b) || "zzz";
      return sA.localeCompare(sB);
    } else if (sortMode === "est_desc") {
      return (Number(b["Initial Estimate"] ?? b["Estimate (Without Tax)"])||0) - (Number(a["Initial Estimate"] ?? a["Estimate (Without Tax)"])||0);
    } else if (sortMode === "est_asc") {
      return (Number(a["Initial Estimate"] ?? a["Estimate (Without Tax)"])||0) - (Number(b["Initial Estimate"] ?? b["Estimate (Without Tax)"])||0);
    }
    // Default: code_asc
    return projectCode(a).localeCompare(projectCode(b), undefined, { numeric: true, sensitivity: 'base' });
  });

  return filtered;
}

function renderPortfolioStatus() {
  const statusEl = $("statusChart");
  if (!statusEl) return;
  const statusCounts = {};
  state.projects.forEach(p => {
    const s = status(p);
    statusCounts[s] = (statusCounts[s] || 0) + 1;
  });
  const total = state.projects.length || 1;
  statusEl.innerHTML = Object.entries(statusCounts).sort((a, b) => b[1] - a[1]).map(([sName, count]) => {
    const pctVal = ((count / total) * 100).toFixed(0);
    return `
      <div class="metric-row">
        <div><b>${safe(sName)}</b></div>
        <div class="bar"><span style="width:${pctVal}%"></span></div>
        <b style="text-align:right;">${count} <span style="font-size:11px;color:var(--text-muted);">(${pctVal}%)</span></b>
      </div>
    `;
  }).join("");
}

function renderAll() {
  const safe_call = (fn, name) => {
    try { fn(); }
    catch(e) { console.error("[NBRI] render error in", name, ":", e.message, e); }
  };
  safe_call(renderProfitabilitySection, "renderProfitabilitySection");
  safe_call(renderPortfolioStatus,      "renderPortfolioStatus");
  safe_call(populateDashControls,       "populateDashControls");
  safe_call(renderExecutiveCharts,      "renderExecutiveCharts");
  safe_call(renderAlerts,               "renderAlerts");
  safe_call(renderProjects,             "renderProjects");
  safe_call(renderKanban,               "renderKanban");
  safe_call(renderWip,                  "renderWip");
  safe_call(renderFinance,              "renderFinance");
  safe_call(applyRolePermissions,       "applyRolePermissions");
}

/* =========================================================================
   EXECUTIVE FINANCIAL & PERFORMANCE DASHBOARD ENGINE
   ========================================================================= */

let dashState = {
  horizon: "month", // 'month' | 'ytd'
  focus: "net",     // 'net' (Division In-House) | 'gross' (Total incl Subcontractor)
  group: "",        // '' (All) | 'B1' | 'B2' | 'R&D' | etc.
  month: "2026-06"
};

function setDashHorizon(mode) {
  dashState.horizon = mode;
  $("dashHorizonMonth")?.classList.toggle("active", mode === "month");
  $("dashHorizonYtd")?.classList.toggle("active", mode === "ytd");
  renderExecutiveDashboard();
}

function setDashFinancialFocus(mode) {
  dashState.focus = mode;
  $("dashFocusNet")?.classList.toggle("active", mode === "net");
  $("dashFocusGross")?.classList.toggle("active", mode === "gross");
  renderExecutiveDashboard();
}

function handleDashMonthChange(m) {
  dashState.month = m;
  renderExecutiveDashboard();
}

function populateDashControls() {
  // Populate Working Groups
  const groupSel = $("dashGroupFilter");
  if (groupSel) {
    const curr = groupSel.value;
    const groups = state.lookups.workingGroups || ["B1", "B2", "R&D", "Other"];
    groupSel.innerHTML = `<option value="">All Working Groups</option>` + groups.map(g => `<option value="${safe(g)}" ${g === curr ? 'selected' : ''}>${safe(g)}</option>`).join("");
  }

  // Populate Months
  const monthSel = $("dashMonthSelect");
  if (monthSel) {
    const allMonths = ["2026-07", "2026-06", "2026-05", "2026-04", "2026-03", "2026-02", "2026-01"];
    const curr = dashState.month || state.month || "2026-06";
    monthSel.innerHTML = allMonths.map(m => `<option value="${m}" ${m === curr ? 'selected' : ''}>${m}</option>`).join("");
  }
}

function renderProfitabilitySection() {
  renderExecutiveDashboard();
}

function renderExecutiveDashboard() {
  populateDashControls();
  const m = dashState.month || state.month || "2026-06";
  const year = (m || "2026").split("-")[0] || "2026";
  const isYtd = dashState.horizon === "ytd";
  const isNet = dashState.focus === "net";
  const selectedGroup = $("dashGroupFilter")?.value || dashState.group || "";
  dashState.group = selectedGroup;

  // Period Badge
  const periodBadge = $("dashPeriodBadge");
  if (periodBadge) {
    periodBadge.textContent = isYtd ? `YTD Jan – ${m.slice(5)} ${year}` : m;
  }

  // Filter projects by Working Group if selected
  const filteredProjects = selectedGroup
    ? state.projects.filter(p => (p["Working Group"] || "").toLowerCase() === selectedGroup.toLowerCase())
    : state.projects;

  const activeCount = filteredProjects.filter(p => status(p) !== "Completed").length;
  const completedCount = filteredProjects.filter(p => status(p) === "Completed").length;
  const totalEst = filteredProjects.reduce((sum, p) => sum + estimateValue(p), 0);

  // Portfolio Snapshot Bar
  const snapEl = $("portfolioSummaryBar");
  if (snapEl) {
    const groupLabel = selectedGroup ? `<span class="badge primary" style="font-size:11px;margin-left:4px;">Group ${safe(selectedGroup)}</span>` : "";
    snapEl.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:20px;">📁</span>
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;">Portfolio Projects ${groupLabel}</div>
          <div style="font-size:16px;font-weight:800;color:var(--text-primary);"><b>${filteredProjects.length}</b> <span style="font-size:12px;font-weight:600;color:var(--text-secondary);">(${activeCount} Active · ${completedCount} Completed)</span></div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:20px;">💰</span>
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;">Contract Portfolio Value</div>
          <div style="font-size:16px;font-weight:800;color:var(--primary-color);">${money(totalEst)}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:20px;">🏛️</span>
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;">Financial Perspective</div>
          <div style="font-size:15px;font-weight:800;color:${isNet ? '#0284c7' : '#7c3aed'};">${isNet ? 'Division Net In-House' : 'Total Gross Turnover'}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:20px;">⏳</span>
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;">Horizon</div>
          <div style="font-size:15px;font-weight:800;color:var(--text-primary);">${isYtd ? '📈 Year-To-Date (Cumulative)' : '📅 Single Month (' + m + ')'}</div>
        </div>
      </div>
    `;
  }

  // Calculate Financial Aggregations (Month vs YTD)
  let divFin = { ...getDivisionFinance(m) };
  if (isYtd) {
    // Sum up from Jan to selected month
    const monthsUpTo = getMonthsForYear(year).filter(x => x.key <= m).map(x => x.key);
    let sumExp = 0, sumSub = 0, sumDivExp = 0, sumMr = 0, sumOut = 0, sumInter = 0, sumWp = 0, sumInc = 0;
    monthsUpTo.forEach(k => {
      const f = getDivisionFinance(k);
      sumExp += (f.expenditure || 0);
      sumSub += (f.subcontractPayment || 0);
      sumDivExp += (f.divisionExpenditure || (f.expenditure - (f.subcontractPayment || 0)));
      sumMr += (f.moneyReceived || 0);
      sumOut += (f.outstanding || 0);
      sumInter += (f.interdivisional || 0);
      sumWp += (f.workingProgress || 0);
      sumInc += (f.income || (f.workingProgress || (f.moneyReceived + f.outstanding)));
    });
    const sumProfit = isNet ? (sumInc - sumDivExp - sumInter) : (sumInc - sumExp - sumInter);
    const sumProfitPct = sumInc > 0 ? (sumProfit / sumInc) * 100 : 0;

    divFin = {
      expenditure: sumExp,
      subcontractPayment: sumSub,
      divisionExpenditure: sumDivExp,
      moneyReceived: sumMr,
      outstanding: sumOut,
      interdivisional: sumInter,
      workingProgress: sumWp,
      income: sumInc,
      profit: sumProfit,
      profitPct: sumProfitPct
    };
  }

  const isLowProfit = divFin.profit < 0 || divFin.profitPct < 5;
  const targetExp = isNet ? (divFin.divisionExpenditure || (divFin.expenditure - (divFin.subcontractPayment || 0))) : divFin.expenditure;
  const expLabel = isNet ? "3. Division Net Exp" : "3. Gross Expenditure";

  // Render 6 Key Financial Indicator KPI Cards
  const kpiEl = $("financeIndicatorKpis");
  if (kpiEl) {
    const profitBadgeHtml = divFin.profit < 0
      ? `<span style="font-size:12px;padding:2px 8px;border-radius:12px;margin-left:4px;background:#fee2e2;color:#b91c1c;font-weight:700;">(${Math.abs(divFin.profitPct).toFixed(1)}% Deficit)</span>`
      : `<span style="font-size:12px;padding:2px 8px;border-radius:12px;margin-left:4px;background:#ecfdf5;color:#047857;font-weight:700;">+${divFin.profitPct.toFixed(1)}% Margin</span>`;

    kpiEl.innerHTML = [
      ["1. Money Received", money(divFin.moneyReceived), "#10b981", ""],
      ["2. Outstanding Claims", money(divFin.outstanding), "#d97706", ""],
      [expLabel, money(targetExp), isNet ? "#b91c1c" : "#ef4444", divFin.subcontractPayment ? `title="Subcontractor: ${money(divFin.subcontractPayment)}"` : ""],
      ["4. Working Progress", money(divFin.workingProgress), "#0284c7", ""],
      ["5. Total Income", money(divFin.income), "#059669", ""],
      [
        isNet ? "6. Division Net Margin" : "6. Total Net Profit / (Deficit)",
        `${money(divFin.profit)} ${profitBadgeHtml}`,
        isLowProfit ? "#ef4444" : "#10b981",
        isLowProfit ? "border-color:#ef4444;background:var(--danger-subtle);" : ""
      ]
    ].map(x => `
      <div class="card" style="border-left:4px solid ${x[2]};${x[3] || ''}">
        <div class="label" style="font-size:11px;font-weight:700;">${x[0]}</div>
        <div class="value" style="font-size:18px;color:${x[2]};">${x[1]}</div>
      </div>
    `).join("");
  }

  renderExecutiveCharts(year);
  renderAlerts();
}

/* EXECUTIVE CHART.JS VISUALIZATION ENGINE */
const chartInstances = { wip: null, cashflow: null, group: null, profit: null };
window.chartInstances = chartInstances;

function formatRupeeMillions(value) {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    return "Rs. " + (value / 1_000_000).toFixed(1) + "M";
  } else if (abs >= 1_000) {
    return "Rs. " + (value / 1_000).toFixed(0) + "K";
  }
  return "Rs. " + value.toLocaleString();
}

function getMonthsForYear(year) {
  return [
    { key: `${year}-01`, label: "Jan" },
    { key: `${year}-02`, label: "Feb" },
    { key: `${year}-03`, label: "Mar" },
    { key: `${year}-04`, label: "Apr" },
    { key: `${year}-05`, label: "May" },
    { key: `${year}-06`, label: "Jun" },
    { key: `${year}-07`, label: "Jul" },
    { key: `${year}-08`, label: "Aug" },
    { key: `${year}-09`, label: "Sep" },
    { key: `${year}-10`, label: "Oct" },
    { key: `${year}-11`, label: "Nov" },
    { key: `${year}-12`, label: "Dec" }
  ];
}

function renderExecutiveCharts(targetYear) {
  if (typeof Chart === "undefined") {
    setTimeout(() => renderExecutiveCharts(targetYear), 150);
    return;
  }

  const m = dashState.month || state.month || "2026-06";
  const year = targetYear || (m || "2026").split("-")[0] || "2026";
  const isNet = dashState.focus === "net";
  const selectedGroup = dashState.group || "";

  const months = getMonthsForYear(year);
  const monthKeys = months.map(m => m.key);
  const monthLabels = months.map(m => m.label);

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const textColor = isDark ? "#e2e8f0" : "#334155";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";

  // Update dynamic titles
  if ($("chart1Title")) {
    $("chart1Title").textContent = isNet
      ? "📈 3-Pillar Trajectory: Income vs. Division Net Exp vs. Margin"
      : "📈 3-Pillar Trajectory: Income vs. Gross Exp (Incl. Subcontract) vs. Margin";
  }
  if ($("chart1Subtitle")) {
    $("chart1Subtitle").textContent = isNet
      ? "Focusing on in-house engineering operations, excluding outsourced subcontractor costs."
      : "Full turnover perspective including subcontractor direct payment outflows.";
  }

  // Calculate Monthly Metrics
  const incomeData = [];
  const divExpData = [];
  const subData = [];
  const grossExpData = [];
  const mrData = [];
  const outData = [];
  const profitMarginData = [];
  const profitPointColors = [];

  monthKeys.forEach(mKey => {
    const fin = getDivisionFinance(mKey);
    let wp = fin.workingProgress || 0;
    if (!wp) {
      wp = state.projects.reduce((sum, p) => {
        if (selectedGroup && (p["Working Group"] || "").toLowerCase() !== selectedGroup.toLowerCase()) return sum;
        const r = getWipRow(projectCode(p), mKey);
        return sum + workingProgressValue(r);
      }, 0);
    }
    const exp = fin.expenditure || 0;
    const sub = fin.subcontractPayment || 0;
    const divExp = (fin.divisionExpenditure !== undefined && fin.divisionExpenditure !== 0) ? fin.divisionExpenditure : Math.max(0, exp - sub);
    const mr = fin.moneyReceived || 0;
    const out = fin.outstanding || 0;
    const inc = (fin.income > 0) ? fin.income : (wp || (mr + out));
    const inter = fin.interdivisional || 0;
    const profit = fin.hasData && fin.profit !== undefined ? fin.profit : (isNet ? (inc - divExp - inter) : (inc - exp - inter));
    const profitPct = inc > 0 ? (profit / inc) * 100 : (fin.profitPct || 0);

    incomeData.push(inc);
    divExpData.push(divExp);
    subData.push(sub);
    grossExpData.push(exp);
    mrData.push(mr);
    outData.push(out);
    profitMarginData.push(Number(profitPct.toFixed(1)));
    profitPointColors.push(profitPct < 5 ? "#ef4444" : "#10b981");
  });

  /* ----------------------------------------------------
     CHART 1: 3-Pillar Financial Performance (Grouped Bar)
     ---------------------------------------------------- */
  const ctxWip = $("chartWipOverview")?.getContext("2d");
  if (ctxWip) {
    if (chartInstances.wip) chartInstances.wip.destroy();

    const chart1Datasets = isNet ? [
      {
        type: "bar",
        label: "Income / WIP",
        data: incomeData,
        backgroundColor: "#0284c7",
        borderRadius: 5
      },
      {
        type: "bar",
        label: "Division Net Exp (In-House)",
        data: divExpData,
        backgroundColor: "#b91c1c",
        borderRadius: 5
      },
      {
        type: "line",
        label: "Net Operating Margin",
        data: profitMarginData.map((pct, idx) => (incomeData[idx] * pct) / 100),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 3,
        pointRadius: 4,
        tension: 0.2
      }
    ] : [
      {
        type: "bar",
        label: "Income / WIP",
        data: incomeData,
        backgroundColor: "#0284c7",
        borderRadius: 5
      },
      {
        type: "bar",
        label: "Division Net Exp",
        data: divExpData,
        backgroundColor: "#b91c1c",
        stack: "exp",
        borderRadius: 4
      },
      {
        type: "bar",
        label: "Subcontractor Payment",
        data: subData,
        backgroundColor: "#e11d48",
        stack: "exp",
        borderRadius: 4
      }
    ];

    chartInstances.wip = new Chart(ctxWip, {
      data: {
        labels: monthLabels,
        datasets: chart1Datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { labels: { color: textColor, font: { size: 11, weight: "600" } } },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${money(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: { ticks: { color: textColor, font: { weight: "600" } }, grid: { display: false } },
          y: {
            ticks: {
              color: textColor,
              callback: (v) => formatRupeeMillions(v)
            },
            grid: { color: gridColor }
          }
        }
      }
    });
  }

  /* ----------------------------------------------------
     CHART 2: Cash Flow Realization Waterfall
     ---------------------------------------------------- */
  const ctxCashflow = $("chartCashflow")?.getContext("2d");
  if (ctxCashflow) {
    if (chartInstances.cashflow) chartInstances.cashflow.destroy();
    chartInstances.cashflow = new Chart(ctxCashflow, {
      type: "bar",
      data: {
        labels: monthLabels,
        datasets: [
          {
            label: "Money Received",
            data: mrData,
            backgroundColor: "#10b981",
            borderRadius: 5
          },
          {
            label: "Total Gross Expenditure",
            data: grossExpData,
            backgroundColor: "#ef4444",
            borderRadius: 5
          },
          {
            label: "Outstanding Claims",
            data: outData,
            backgroundColor: "#f97316",
            borderRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { labels: { color: textColor, font: { size: 11, weight: "600" } } },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${money(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: { ticks: { color: textColor, font: { weight: "600" } }, grid: { display: false } },
          y: {
            ticks: {
              color: textColor,
              callback: (v) => formatRupeeMillions(v)
            },
            grid: { color: gridColor }
          }
        }
      }
    });
  }

  /* ----------------------------------------------------
     CHART 3: Working Group Portfolio Share & Revenue
     ---------------------------------------------------- */
  const ctxGroup = $("chartGroupDistribution")?.getContext("2d");
  if (ctxGroup) {
    const groupTotals = {};
    const groupWipTotals = {};
    state.projects.forEach(p => {
      const g = p["Working Group"] || "Unassigned";
      const est = estimateValue(p);
      groupTotals[g] = (groupTotals[g] || 0) + (est > 0 ? est : 1);

      const r = getWipRow(projectCode(p), m);
      const wp = workingProgressValue(r);
      groupWipTotals[g] = (groupWipTotals[g] || 0) + wp;
    });

    const groupLabels = Object.keys(groupTotals);
    const groupValues = Object.values(groupTotals);
    const donutColors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#64748b"];

    if (chartInstances.group) chartInstances.group.destroy();
    chartInstances.group = new Chart(ctxGroup, {
      type: "doughnut",
      data: {
        labels: groupLabels,
        datasets: [
          {
            data: groupValues,
            backgroundColor: donutColors.slice(0, groupLabels.length),
            borderWidth: 2,
            borderColor: isDark ? "#1e293b" : "#ffffff"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "right", labels: { color: textColor, font: { size: 11, weight: "600" } } },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const gName = ctx.label;
                const wipVal = groupWipTotals[gName] || 0;
                return ` ${gName}: ${formatRupeeMillions(ctx.parsed)} Est • Month WIP: ${formatRupeeMillions(wipVal)}`;
              }
            }
          }
        }
      }
    });
  }

  /* ----------------------------------------------------
     CHART 4: Profit Margin % Trend & 5% Alert Threshold
     ---------------------------------------------------- */
  const ctxProfit = $("chartProfitTrend")?.getContext("2d");
  if (ctxProfit) {
    if (chartInstances.profit) chartInstances.profit.destroy();
    chartInstances.profit = new Chart(ctxProfit, {
      type: "line",
      data: {
        labels: monthLabels,
        datasets: [
          {
            label: "5% Safety Benchmark",
            data: monthLabels.map(() => 5),
            borderColor: "#ef4444",
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
            fill: false
          },
          {
            label: isNet ? "Division Net Profit Margin %" : "Total Gross Margin %",
            data: profitMarginData,
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            pointBackgroundColor: profitPointColors,
            pointBorderColor: "#ffffff",
            pointRadius: 6,
            pointHoverRadius: 8,
            borderWidth: 3,
            tension: 0.25,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { labels: { color: textColor, font: { size: 11, weight: "600" } } },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                if (ctx.datasetIndex === 0) return "5% Safety Threshold (Red Alert if Below)";
                const v = ctx.parsed.y;
                return `Margin: ${v.toFixed(1)}% ${v < 0 ? '🔻 (Operating Deficit)' : (v < 5 ? '⚠️ (<5% Alert)' : '✓')}`;
              }
            }
          }
        },
        scales: {
          x: { ticks: { color: textColor, font: { weight: "600" } }, grid: { display: false } },
          y: {
            ticks: {
              color: textColor,
              callback: (v) => `${v}%`
            },
            grid: { color: gridColor }
          }
        }
      }
    });
  }
}

function renderAlerts() {
  const missing = state.projects.filter(p => status(p) !== "Completed" && currentWip(projectCode(p)).physical === 0).length;
  const high = state.projects.filter(p => {
    const c = cumulative(projectCode(p));
    return c.physical > 0.8 && (Number(p["Initial Estimate"])||0) > 0 && c.financial < (Number(p["Initial Estimate"])||0) * 0.5;
  }).length;

  $("alerts").innerHTML = `
    <div class="alert ${missing ? '' : 'green'}"><b>${missing}</b> active projects have no physical progress update for ${state.month}.</div>
    <div class="alert ${high ? 'red' : 'green'}"><b>${high}</b> projects have >80% physical completion with <50% financial billing against estimate.</div>
    <div class="alert green">Use <b>Monthly WIP</b> view to submit reporting month entries in bulk.</div>
  `;
}

function setProjectSort(mode) {
  const sel = $("projectSortFilter");
  if (sel) {
    if (sel.value === mode) {
      if (mode.endsWith("_asc")) sel.value = mode.replace("_asc", "_desc");
      else if (mode.endsWith("_desc")) sel.value = mode.replace("_desc", "_asc");
    } else {
      sel.value = mode;
    }
  }
  renderProjects();
}
window.setProjectSort = setProjectSort;

/* PROJECTS TABLE VIEW WITH IN-LINE EDITING */
function renderProjects() {
  const rows = getFilteredProjects();
  const statuses = state.lookups.statuses || ["In Progress", "Completed", "Pending", "On Hold"];
  const sortMode = $("projectSortFilter")?.value || "code_asc";
  const role = state.user ? (state.user.role || "Viewer") : "Viewer";
  const isViewer = role === "Viewer";

  $("projectTable").innerHTML = `
    <thead>
      <tr>
        <th style="cursor:pointer;" onclick="setProjectSort('code_asc')" title="Sort by Code">Code ${sortMode.startsWith("code") ? (sortMode.endsWith("asc") ? "▲" : "▼") : ""}</th>
        <th style="cursor:pointer;" onclick="setProjectSort('year_desc')" title="Sort by Registered Year">Year ${sortMode.startsWith("year") ? (sortMode.endsWith("desc") ? "▼" : "▲") : ""}</th>
        <th style="cursor:pointer;" onclick="setProjectSort('client_asc')" title="Sort by Client">Client ${sortMode.startsWith("client") ? "▲" : ""}</th>
        <th>Description</th>
        <th style="cursor:pointer;" onclick="setProjectSort('group_asc')" title="Sort by Working Group">Working Group ${sortMode.startsWith("group") ? "▲" : ""}</th>
        <th style="cursor:pointer;" onclick="setProjectSort('scientist_asc')" title="Sort by Scientist">Scientist ${sortMode.startsWith("scientist") ? "▲" : ""}</th>
        <th style="cursor:pointer;" onclick="setProjectSort('status_asc')" title="Sort by Status">Status ${sortMode.startsWith("status") ? "▲" : ""}</th>
        <th style="cursor:pointer;" onclick="setProjectSort('est_desc')" title="Sort by Estimate">Estimate (Rs.) ${sortMode.startsWith("est") ? (sortMode.endsWith("desc") ? "▼" : "▲") : ""}</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${rows.map(p => {
        const uBy = p["Updated By"] || p.updatedBy || "";
        const uAt = p["Updated At"] || p.updatedAt || "";
        const st = status(p);
        const pYear = registeredYear(p);
        const stBadgeClass = st.toLowerCase().includes("complete") ? "completed" : (st.toLowerCase().includes("progress") ? "in-progress" : "pipeline");
        return `
        <tr data-id="${safe(projectId(p))}">
          <td class="code"><b>${safe(projectCode(p))}</b></td>
          <td><span class="badge secondary" style="font-size:11px;font-weight:700;">${safe(pYear)}</span></td>
          <td><b>${safe(p["Client"])}</b></td>
          <td style="font-size:12px;max-width:320px;">
            ${safe(p["Description"])}
            ${uBy ? `<div style="font-size:10px;color:var(--text-muted);margin-top:2px;">✍️ ${safe(uBy)}${uAt ? ' · ' + safe(String(uAt).slice(0, 10)) : ''}</div>` : ''}
          </td>
          <td><span class="badge">${safe(p["Working Group"])}</span></td>
          <td style="max-width:180px;">
            ${staffBadge(scientist(p), "🔬")}
            ${projectLeader(p) ? `<div style="margin-top:3px;font-size:11px;">${staffBadge(projectLeader(p), "👔")}</div>` : ''}
          </td>
          <td>
            ${isViewer ? `
              <span class="badge ${stBadgeClass}" style="font-size:11px;padding:3px 8px;">${safe(st)}</span>
            ` : `
              <select class="inline-select" onchange="updateProjectStatusInline('${safe(projectId(p))}', this.value)">
                ${statuses.map(s => `<option value="${safe(s)}" ${s === st ? 'selected' : ''}>${safe(s)}</option>`).join("")}
              </select>
            `}
          </td>
          <td><b>${money(p["Initial Estimate"] ?? p["Estimate (Without Tax)"])}</b></td>
          <td>
            <button class="ghost" style="padding:4px 8px;font-size:11px;" onclick="editProject('${safe(projectId(p))}')">${isViewer ? '👁️ View' : '✏️ Edit'}</button>
          </td>
        </tr>
      `;}).join("")}
    </tbody>
  `;
}

async function updateProjectStatusInline(id, newStatus) {
  const role = state.user ? (state.user.role || "Viewer") : "Viewer";
  if (role === "Viewer") {
    showToast("View-only access. Please sign in to edit project status.", true);
    return;
  }

  const p = state.projects.find(x => projectId(x) === id || projectCode(x) === id);
  if (!p) return;
  const userLabel = getCurrentUserDisplayName();
  const nowIso = new Date().toISOString();
  const old = p["Current Status"] || p["Status"];
  const oldBy = p["Updated By"];
  const oldAt = p["Updated At"];
  p["Current Status"] = newStatus;
  p["Status"] = newStatus;
  p["Updated By"] = userLabel;
  p["Updated At"] = nowIso;
  logSystemAction("STATUS_CHANGE", projectCode(p), `Status changed to ${newStatus}`);
  showToast(`Updated ${projectCode(p)} status to ${newStatus}`);

  try {
    await apiPost("updateProject", {
      project: {
        projectId: projectId(p),
        projectCode: projectCode(p),
        status: newStatus,
        updatedBy: userLabel,
        updatedAt: nowIso
      }
    });
    // Background GitHub commit
    commitToGitHub(`Update status of ${projectCode(p)} to ${newStatus}`).catch(console.warn);
  } catch (err) {
    p["Current Status"] = old;
    p["Status"] = old;
    p["Updated By"] = oldBy;
    p["Updated At"] = oldAt;
    renderProjects();
    renderKanban();
    showToast("Failed to save status update to central database", true);
  }
}

/* KANBAN BOARD VIEW WITH HTML5 DRAG & DROP */
function setViewMode(mode) {
  state.viewMode = mode;
  $("viewModeTable").classList.toggle("active", mode === "table");
  $("viewModeKanban").classList.toggle("active", mode === "kanban");
  $("projectTableWrap").style.display = mode === "table" ? "block" : "none";
  $("kanbanWrap").style.display = mode === "kanban" ? "block" : "none";
  if (mode === "kanban") renderKanban();
  else renderProjects();
}

function renderKanban() {
  const board = $("kanbanBoard");
  if (!board) return;
  const statuses = state.lookups.statuses || ["In Progress", "Completed", "Pending", "On Hold"];
  const filtered = getFilteredProjects();
  const role = state.user ? (state.user.role || "Viewer") : "Viewer";
  const isViewer = role === "Viewer";

  board.innerHTML = statuses.map(s => {
    const projs = filtered.filter(p => status(p) === s);
    return `
      <div class="kanban-column" data-status="${safe(s)}" ondragover="${isViewer ? '' : 'handleDragOver(event)'}" ondragleave="${isViewer ? '' : 'handleDragLeave(event)'}" ondrop="${isViewer ? '' : `handleDrop(event, '${safe(s)}')`}">
        <div class="kanban-column-header">
          <div class="kanban-title">
            <span>${safe(s)}</span>
            <span class="kanban-count">${projs.length}</span>
          </div>
        </div>
        <div class="kanban-cards">
          ${projs.map(p => `
            <div class="kanban-card" draggable="${!isViewer}" ondragstart="${isViewer ? '' : `handleDragStart(event, '${safe(projectId(p))}')`}" onclick="editProject('${safe(projectId(p))}')" style="cursor:${isViewer ? 'pointer' : 'grab'};">
              <div class="kanban-card-code">${safe(projectCode(p))}</div>
              <div class="kanban-card-client">${safe(p["Client"])}</div>
              <div class="kanban-card-desc">${safe(p["Description"])}</div>
              <div class="kanban-card-footer">
                <span class="badge" style="font-size:10px;padding:2px 6px;">${safe(p["Working Group"])}</span>
                <span style="font-size:11px;">${staffBadge(scientist(p), "🔬")}</span>
                <b style="font-size:11px;color:var(--text-primary);">${money(p["Initial Estimate"] ?? p["Estimate (Without Tax)"])}</b>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }).join("");
}

let draggedProjectId = null;
function handleDragStart(e, id) {
  const role = state.user ? (state.user.role || "Viewer") : "Viewer";
  if (role === "Viewer") return;
  draggedProjectId = id;
  e.dataTransfer.setData("text/plain", id);
  e.dataTransfer.effectAllowed = "move";
}

function handleDragOver(e) {
  const role = state.user ? (state.user.role || "Viewer") : "Viewer";
  if (role === "Viewer") return;
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  e.currentTarget.classList.add("drag-over");
}

function handleDragLeave(e) {
  e.currentTarget.classList.remove("drag-over");
}

function handleDrop(e, targetStatus) {
  const role = state.user ? (state.user.role || "Viewer") : "Viewer";
  if (role === "Viewer") return;
  e.preventDefault();
  e.currentTarget.classList.remove("drag-over");
  if (!draggedProjectId) return;

  const p = state.projects.find(x => projectId(x) === draggedProjectId || projectCode(x) === draggedProjectId);
  if (p && (p["Current Status"] !== targetStatus && p["Status"] !== targetStatus)) {
    updateProjectStatusInline(draggedProjectId, targetStatus);
    renderKanban();
  }
  draggedProjectId = null;
}

/* MONTHLY WIP & PROGRESS MATRIX (CARDS VS TABLE VIEW) */
function recalcFinanceSummary() {
  const exp = parseNum($("summaryExp")?.value);
  const subcontract = parseNum($("summarySubcontract")?.value);
  const divExp = exp - subcontract;
  const mr = parseNum($("summaryMr")?.value);
  const out = parseNum($("summaryOut")?.value);
  const inter = parseNum($("summaryInter")?.value);

  // Sum all working progress inputs from the active view container only
  const activeScope = (state.matrixViewMode === "cards" ? $("matrixCardList") : $("wipTable")) || document;
  let totalWp = 0;
  activeScope.querySelectorAll("[data-wip-wp]").forEach(el => {
    totalWp += parseNum(el.value);
  });

  const income = totalWp > 0 ? totalWp : (mr + out);
  const profit = income - exp - inter;
  const profitPct = income > 0 ? (profit / income) * 100 : 0;
  const isDeficit = profit < 0;

  if ($("summaryDivExpDisplay")) {
    $("summaryDivExpDisplay").textContent = money(divExp > 0 ? divExp : 0);
  }
  $("summaryWpDisplay").textContent = money(totalWp);
  $("summaryIncDisplay").textContent = money(income);
  $("summaryProfitDisplay").textContent = money(profit);
  $("summaryProfitDisplay").style.color = isDeficit ? "var(--danger)" : "var(--success)";

  const badge = $("summaryProfitBadge");
  if (badge) {
    if (isDeficit) {
      badge.textContent = `(${Math.abs(profitPct).toFixed(1)}% Operating Deficit)`;
      badge.style.background = "#fee2e2";
      badge.style.color = "#b91c1c";
      badge.style.border = "1px solid #fca5a5";
    } else {
      badge.textContent = `${profitPct.toFixed(1)}% Profit Margin`;
      badge.style.background = "#ecfdf5";
      badge.style.color = "#047857";
      badge.style.border = "1px solid #a7f3d0";
    }
  }
}

function recalcProjectRow(key, sourceEl = null) {
  // Sync value across both Card and Table views
  if (sourceEl) {
    const val = sourceEl.value;
    const attr = sourceEl.hasAttribute("data-wip-wp") ? "data-wip-wp" :
                 sourceEl.hasAttribute("data-wip-adv") ? "data-wip-adv" :
                 sourceEl.hasAttribute("data-wip-r") ? "data-wip-r" : null;
    if (attr) {
      document.querySelectorAll(`input[${attr}]`).forEach(el => {
        if (el !== sourceEl && el.getAttribute(attr) === key) el.value = val;
      });
    }
  }

  const activeScope = (state.matrixViewMode === "cards" ? $("matrixCardList") : $("wipTable")) || document;
  const row = sourceEl ? (sourceEl.closest("tr") || sourceEl.closest(".matrix-card-modern")) : null;
  const wpEl = (row ? row.querySelector("input[data-wip-wp]") : null) || activeScope.querySelector(`input[data-wip-wp="${key}"]`) || document.querySelector(`input[data-wip-wp="${key}"]`);
  const wp = parseNum(wpEl?.value);
  const prevEl = (row ? row.querySelector("[data-wip-prev]") : null) || activeScope.querySelector(`[data-wip-prev="${key}"]`) || document.querySelector(`[data-wip-prev="${key}"]`);
  const prev = parseNum(prevEl?.getAttribute("data-val"));
  const total = prev + wp;

  document.querySelectorAll("[data-wip-total]").forEach(el => {
    if (el.getAttribute("data-wip-total") === key) {
      el.textContent = money(total);
    }
  });

  // Update estimate % badge
  const estEl = (row ? row.querySelector("[data-wip-est]") : null) || activeScope.querySelector(`[data-wip-est="${key}"]`) || document.querySelector(`[data-wip-est="${key}"]`);
  const estVal = parseNum(estEl?.getAttribute("data-val"));
  if (estVal > 0) {
    const p = ((total / estVal) * 100).toFixed(0);
    document.querySelectorAll("[id^='estBadge_']").forEach(b => {
      if (b.id === `estBadge_${key}`) {
        b.textContent = `${p}% of Est`;
      }
    });
  }

  recalcFinanceSummary();
}

function updateProgressBar(key, sourceEl = null) {
  if (sourceEl) {
    const val = sourceEl.value;
    document.querySelectorAll("input[data-wip-p]").forEach(el => {
      if (el !== sourceEl && el.getAttribute("data-wip-p") === key) el.value = val;
    });
  }
  const activeScope = (state.matrixViewMode === "cards" ? $("matrixCardList") : $("wipTable")) || document;
  const row = sourceEl ? (sourceEl.closest("tr") || sourceEl.closest(".matrix-card-modern")) : null;
  const pInput = (row ? row.querySelector("input[data-wip-p]") : null) || activeScope.querySelector(`input[data-wip-p="${key}"]`) || document.querySelector(`input[data-wip-p="${key}"]`);
  const val = Math.max(0, Math.min(100, parseNum(pInput?.value)));
  document.querySelectorAll(`[id="pbar_${key}"]`).forEach(bar => {
    bar.style.width = val + "%";
  });
}

function setMatrixViewMode(mode) {
  state.matrixViewMode = mode;
  $("matrixViewCards")?.classList.toggle("active", mode === "cards");
  $("matrixViewTable")?.classList.toggle("active", mode === "table");

  const cardsContainer = $("matrixCardList");
  const tableWrap = $("matrixTableWrap");

  if (cardsContainer) cardsContainer.style.display = mode === "cards" ? "flex" : "none";
  if (tableWrap) tableWrap.style.display = mode === "table" ? "block" : "none";

  renderWip();
}

function renderWip() {
  const m = $("wipMonth")?.value || state.month || "2026-06";
  state.month = m;
  if ($("matrixMonthBadge")) $("matrixMonthBadge").textContent = m;

  // Pre-load Division Summary Inputs from Database if available for this month
  const divFin = getDivisionFinance(m);
  $("summaryExp").value = divFin.hasData && divFin.expenditure ? formatInputCurrency(divFin.expenditure, 2) : "";
  if ($("summarySubcontract")) $("summarySubcontract").value = divFin.hasData && divFin.subcontractPayment ? formatInputCurrency(divFin.subcontractPayment, 2) : "";
  $("summaryMr").value = divFin.hasData && divFin.moneyReceived ? formatInputCurrency(divFin.moneyReceived, 2) : "";
  $("summaryOut").value = divFin.hasData && divFin.outstanding ? formatInputCurrency(divFin.outstanding, 2) : "";
  $("summaryInter").value = divFin.hasData && divFin.interdivisional ? formatInputCurrency(divFin.interdivisional, 2) : "";

  const auditEl = $("summaryAuditLabel");
  if (auditEl) {
    if (divFin.hasData && divFin.updatedBy) {
      auditEl.style.display = "block";
      auditEl.innerHTML = `✍️ Financial summary for <b>${safe(m)}</b> was last updated by <b>${safe(divFin.updatedBy)}</b>${divFin.updatedAt ? ' on ' + safe(String(divFin.updatedAt).slice(0, 10)) : ''}`;
    } else {
      auditEl.style.display = "none";
    }
  }

  const container = $("matrixCardList");
  const tableWrap = $("matrixTableWrap");
  if (!container) return;

  const mode = state.matrixViewMode || "table";
  if (container) container.style.display = mode === "cards" ? "flex" : "none";
  if (tableWrap) tableWrap.style.display = mode === "table" ? "block" : "none";

  const query = ($("matrixSearch")?.value || "").toLowerCase().trim();
  const scientistFilter = $("matrixScientistFilter")?.value || "";
  const groupFilter = $("matrixGroupFilter")?.value || "";
  const wipFilter = $("matrixWipFilter")?.value || "";
  const sortMode = $("matrixSortSelect")?.value || "code_asc";

  let active = state.projects.filter(p => {
    const st = status(p).toLowerCase().trim();
    // Support WIP filter status selection
    if (wipFilter === "completed") {
      if (st !== "completed") return false;
    } else if (wipFilter !== "all") {
      if (st === "completed") return false;
    }

    // 1. Text Search Filter (includes code, client, description, and scientist)
    if (query) {
      const txt = `${projectCode(p)} ${p["Client"]} ${p["Description"]} ${scientist(p)} ${staffDisplayName(scientist(p))} ${projectLeader(p)} ${staffDisplayName(projectLeader(p))}`.toLowerCase();
      if (!txt.includes(query)) return false;
    }

    // 2. Scientist Filter (matches by EPF or Name)
    if (scientistFilter) {
      const scList = parseStaffList(scientist(p));
      const match = scList.some(s => {
        const u = findStaffByEpfOrName(s);
        if (u) {
          return String(u.epf) === scientistFilter || 
                 (u.fullName && u.fullName.toLowerCase().includes(scientistFilter.toLowerCase())) ||
                 (u.shortName && u.shortName.toLowerCase().includes(scientistFilter.toLowerCase())) ||
                 scientistFilter.toLowerCase().includes(String(u.epf).toLowerCase());
        }
        return s.toLowerCase().includes(scientistFilter.toLowerCase()) || scientistFilter.toLowerCase().includes(s.toLowerCase());
      });
      if (!match) return false;
    }

    // 3. Working Group Filter
    if (groupFilter) {
      const pGrp = String(p["Working Group"] || "").toLowerCase().trim();
      const fGrp = groupFilter.toLowerCase().trim();
      if (pGrp !== fGrp && !pGrp.includes(fGrp) && !fGrp.includes(pGrp)) return false;
    }

    // 4. WIP Status Filter (with progress vs zero progress)
    if (wipFilter === "with_wip" || wipFilter === "zero_wip") {
      const w = currentWip(projectCode(p), m);
      if (wipFilter === "with_wip" && !(w.hasMonthData && w.financial > 0)) return false;
      if (wipFilter === "zero_wip" && (w.hasMonthData && w.financial > 0)) return false;
    }
    return true;
  });

  // Sort Active Projects
  active.sort((a, b) => {
    if (sortMode === "scientist_asc") {
      const sA = scientist(a) || "zzz", sB = scientist(b) || "zzz";
      return sA.localeCompare(sB) || projectCode(a).localeCompare(projectCode(b), undefined, { numeric: true, sensitivity: 'base' });
    } else if (sortMode === "group_asc") {
      const gA = a["Working Group"] || "zzz", gB = b["Working Group"] || "zzz";
      return gA.localeCompare(gB) || projectCode(a).localeCompare(projectCode(b), undefined, { numeric: true, sensitivity: 'base' });
    } else if (sortMode === "est_desc") {
      return estimateValue(b) - estimateValue(a);
    } else if (sortMode === "wip_desc") {
      const wA = currentWip(projectCode(a), m).financial || 0;
      const wB = currentWip(projectCode(b), m).financial || 0;
      return wB - wA;
    }
    return projectCode(a).localeCompare(projectCode(b), undefined, { numeric: true, sensitivity: 'base' });
  });

  // Update Active Count Badge
  if ($("matrixCountBadge")) {
    $("matrixCountBadge").textContent = `${active.length} Active Projects`;
  }

  if (!active.length) {
    container.innerHTML = `<div style="padding:36px;text-align:center;color:var(--text-muted);background:var(--bg-surface-subtle);border-radius:var(--radius-md);font-size:13px;border:1px dashed var(--border-color);">No active projects found matching your filter criteria.</div>`;
    $("wipTable").innerHTML = `<tbody><tr><td colspan="10" style="padding:32px;text-align:center;color:var(--text-muted);">No active projects found matching your filter criteria.</td></tr></tbody>`;
    recalcFinanceSummary();
    return;
  }

  // 1. Render Ultra-Modern Zero-Scroll Cards View
  container.innerHTML = active.map(p => {
    const code = projectCode(p);
    const key = projectId(p) || code;
    const w = currentWip(code, m);
    const estNoTax = estimateValue(p);
    const adv = advanceValue(p, m);
    const prevCum = prevCumulativeValue(p, m);
    const totCum = prevCum + (w.hasMonthData ? w.financial : 0);
    const estPct = estNoTax > 0 ? ((totCum / estNoTax) * 100).toFixed(0) : 0;

    return `
      <div class="matrix-card-modern">
        <!-- HEADER ROW: Project ID, Discipline, Scientist, Client & Truncated Scope -->
        <div class="matrix-card-header">
          <div class="matrix-card-meta">
            <span class="matrix-code-chip">📌 ${safe(code)}</span>
            <span class="matrix-group-chip">${safe(p["Working Group"] || "GED")}</span>
            <span class="matrix-eng-chip">${staffBadge(scientist(p), "🔬")}</span>
            ${projectLeader(p) ? `<span class="matrix-eng-chip" style="background:#fef3c7;color:#92400e;border-color:#fde68a;">${staffBadge(projectLeader(p), "👑")}</span>` : ''}
            <span class="badge in-progress" style="font-size:10px;padding:2px 7px;">${safe(status(p))}</span>
          </div>
          <div class="matrix-card-title">
            <span class="matrix-client-name">${safe(p["Client"])}</span>
            <span class="matrix-desc-text" title="${safe(p["Description"])}">• ${safe(p["Description"]) || 'Geotechnical scope & engineering assessment'}</span>
          </div>
        </div>

        <!-- 3-COLUMN FLUID GRID: Zero Horizontal Scrolling Required -->
        <div class="matrix-card-grid">
          <!-- Column 1: Financial Baselines -->
          <div class="matrix-sub-panel" data-wip-est="${safe(key)}" data-val="${estNoTax}">
            <div class="matrix-panel-tag">1. Financial Baselines</div>
            <div class="matrix-metric-row">
              <span class="lbl">Estimate (w/o tax):</span>
              <span class="val">${estNoTax ? money(estNoTax) : '-'}</span>
            </div>
            <div class="matrix-metric-row">
              <span class="lbl">Advance (w/o tax):</span>
              <input data-wip-adv="${safe(key)}" type="text" inputmode="decimal" value="${adv ? formatInputCurrency(adv, 2) : ''}" placeholder="0.00" oninput="formatCurrencyInputLive(this); recalcProjectRow('${safe(key)}', this)" onblur="formatCurrencyInputBlur(this)">
            </div>
            <div class="matrix-metric-row">
              <span class="lbl">Prev. Cumulative:</span>
              <span class="val" data-wip-prev="${safe(key)}" data-val="${prevCum}">${prevCum ? money(prevCum) : 'Rs. 0.00'}</span>
            </div>
          </div>

          <!-- Column 2: Selected Month Progress (Highlighted Cyan) -->
          <div class="matrix-sub-panel highlight">
            <div class="matrix-panel-tag cyan">2. Selected Month Progress (${safe(m)})</div>
            <div class="matrix-input-item">
              <label>Monthly Progress (Rs.)</label>
              <div class="matrix-currency-wrap">
                <span class="prefix">Rs.</span>
                <input data-wip-wp="${safe(key)}" type="text" inputmode="decimal" value="${w.hasMonthData && w.financial ? formatInputCurrency(w.financial, 2) : ''}" placeholder="0.00" oninput="formatCurrencyInputLive(this); recalcProjectRow('${safe(key)}', this)" onblur="formatCurrencyInputBlur(this)">
              </div>
              ${w.lastMonth ? `
                <div class="matrix-last-ref" title="Last recorded update before ${safe(m)}">
                  <span>📅 Prev (${safe(w.lastMonth)}):</span>
                  <b>${money(w.lastFinancial)}</b>
                  <span>·</span>
                  <b>${pct(w.lastPhysical).toFixed(0)}%</b>
                </div>
              ` : `
                <div class="matrix-last-ref">
                  <span>📅 No prior updates</span>
                </div>
              `}
            </div>
            <div class="matrix-input-item">
              <label>
                <span>Physical WIP %</span>
                <span style="font-weight:700;color:var(--text-primary);">${w.hasMonthData && w.physical ? pct(w.physical).toFixed(0) : '0'}%</span>
              </label>
              <div class="matrix-p-row">
                <input data-wip-p="${safe(key)}" type="number" step="0.01" min="0" max="100" value="${w.hasMonthData && w.physical ? (w.physical * 100) : ''}" placeholder="0%" oninput="updateProgressBar('${safe(key)}', this)">
                <div class="bar">
                  <span id="pbar_${safe(key)}" style="width:${w.hasMonthData && w.physical ? pct(w.physical) : 0}%;"></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Column 3: Total Cumulative & Monthly Remarks -->
          <div class="matrix-sub-panel">
            <div class="matrix-panel-tag green">3. Cumulative & Remarks</div>
            <div class="matrix-total-box">
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--text-muted);">Total Cumulative</div>
                <div class="matrix-total-val" data-wip-total="${safe(key)}">${money(totCum)}</div>
              </div>
              <span class="badge completed" id="estBadge_${safe(key)}" style="font-size:11px;font-weight:700;">${estPct}% of Est</span>
            </div>
            <div style="display:flex;gap:6px;align-items:center;">
              <input class="matrix-remarks-input" data-wip-r="${safe(key)}" value="${safe(w.remarks || '')}" placeholder="Monthly progress remarks, claim notes, invoice status..." style="flex:1;" oninput="recalcProjectRow('${safe(key)}', this)">
              <button class="primary btn-save-row" id="btnSaveCard_${safe(key)}" style="padding:6px 12px;font-size:11.5px;font-weight:700;border-radius:4px;flex-shrink:0;background:var(--primary);color:#fff;cursor:pointer;white-space:nowrap;" onclick="saveWip('${safe(key)}')" title="Save progress for this project only">💾 Save</button>
            </div>
            ${w.updatedBy ? `<div style="font-size:10px;color:var(--text-muted);margin-top:4px;">✍️ Last updated by <b>${safe(w.updatedBy)}</b>${w.updatedAt ? ' on ' + safe(String(w.updatedAt).slice(0, 10)) : ''}</div>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join("");

  // 2. Render Compact Spreadsheet Table View
  $("wipTable").innerHTML = `
    <thead>
      <tr style="background:var(--bg-surface-subtle);">
        <th style="padding:7px 8px;text-align:left;font-size:11px;width:80px;white-space:nowrap;">No / Code</th>
        <th style="padding:7px 8px;text-align:left;font-size:11px;min-width:200px;">Client & Scope</th>
        <th style="padding:7px 8px;text-align:left;font-size:11px;width:110px;white-space:nowrap;">Assigned Staff</th>
        <th style="padding:7px 8px;text-align:right;font-size:11px;width:95px;white-space:nowrap;">Estimate (w/o tax)</th>
        <th style="padding:7px 8px;text-align:right;font-size:11px;width:85px;white-space:nowrap;">Advance (w/o tax)</th>
        <th style="padding:7px 8px;text-align:right;font-size:11px;width:85px;white-space:nowrap;">Prev. Cum.</th>
        <th style="padding:7px 8px;text-align:right;font-size:11px;width:100px;color:#0284c7;white-space:nowrap;">Selected Month</th>
        <th style="padding:7px 8px;text-align:center;font-size:11px;width:55px;white-space:nowrap;">Phys %</th>
        <th style="padding:7px 8px;text-align:right;font-size:11px;width:95px;color:#10b981;white-space:nowrap;">Total Cum.</th>
        <th style="padding:7px 8px;text-align:left;font-size:11px;min-width:120px;">Remarks & Notes</th>
        <th style="padding:7px 8px;text-align:center;font-size:11px;width:75px;white-space:nowrap;">Action</th>
      </tr>
    </thead>
    <tbody>
      ${active.map(p => {
        const code = projectCode(p);
        const key = projectId(p) || code;
        const w = currentWip(p, m);
        const estNoTax = estimateValue(p);
        const adv = advanceValue(p, m);
        const prevCum = prevCumulativeValue(p, m);
        const totCum = prevCum + (w.hasMonthData ? w.financial : 0);

        return `<tr style="border-bottom:1px solid var(--border-color-subtle);height:38px;">
          <td class="code" style="padding:5px 8px;font-size:11.5px;white-space:nowrap;"><b>${safe(code)}</b></td>
          <td style="padding:5px 8px;font-size:11.5px;max-width:280px;">
            <div style="font-weight:700;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${safe(p["Client"])}</div>
            <div style="color:var(--text-muted);font-size:10.5px;line-height:1.2;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;" title="${safe(p["Description"])}">${safe(p["Description"])}</div>
          </td>
          <td style="padding:5px 8px;font-size:11px;max-width:180px;">
            ${staffBadge(scientist(p), "🔬")}
            ${projectLeader(p) ? `<div style="margin-top:2px;">${staffBadge(projectLeader(p), "👑")}</div>` : ''}
          </td>
          <td style="padding:5px 8px;text-align:right;font-size:11.5px;white-space:nowrap;">${estNoTax ? money(estNoTax) : '-'}</td>
          <td style="padding:5px 8px;text-align:right;">
            <input data-wip-adv="${safe(key)}" type="text" inputmode="decimal" value="${adv ? formatInputCurrency(adv, 2) : ''}" style="width:78px;height:26px;text-align:right;padding:2px 5px;font-size:11px;border-radius:4px;border:1px solid var(--border-color);" placeholder="0.00" oninput="formatCurrencyInputLive(this); recalcProjectRow('${safe(key)}', this)" onblur="formatCurrencyInputBlur(this)">
          </td>
          <td style="padding:5px 8px;text-align:right;font-size:11px;white-space:nowrap;">
            <span data-wip-prev="${safe(key)}" data-val="${prevCum}">${prevCum ? money(prevCum) : 'Rs. 0.00'}</span>
          </td>
          <td style="padding:5px 8px;text-align:right;">
            <input data-wip-wp="${safe(key)}" type="text" inputmode="decimal" value="${w.hasMonthData && w.financial ? formatInputCurrency(w.financial, 2) : ''}" style="width:90px;height:26px;text-align:right;font-weight:700;color:#0284c7;padding:2px 5px;font-size:11.5px;border-radius:4px;border:1px solid rgba(2,132,199,0.4);" placeholder="0.00" oninput="formatCurrencyInputLive(this); recalcProjectRow('${safe(key)}', this)" onblur="formatCurrencyInputBlur(this)">
          </td>
          <td style="padding:5px 8px;text-align:center;">
            <input data-wip-p="${safe(key)}" type="number" step="0.01" min="0" max="100" value="${w.hasMonthData && w.physical ? (w.physical * 100) : ''}" style="width:48px;height:26px;text-align:center;padding:2px 3px;font-size:11px;border-radius:4px;border:1px solid var(--border-color);" placeholder="0%" oninput="updateProgressBar('${safe(key)}', this)">
          </td>
          <td style="padding:5px 8px;text-align:right;font-size:11.5px;white-space:nowrap;">
            <b data-wip-total="${safe(key)}" style="color:#10b981;">${money(totCum)}</b>
          </td>
          <td style="padding:5px 8px;">
            <input data-wip-r="${safe(key)}" value="${safe(w.remarks || '')}" placeholder="Notes..." style="width:100%;height:26px;padding:2px 6px;font-size:11px;border-radius:4px;border:1px solid var(--border-color);" oninput="recalcProjectRow('${safe(key)}', this)">
            ${w.updatedBy ? `<div style="font-size:9px;color:var(--text-muted);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="Updated by ${safe(w.updatedBy)}">✍️ ${safe(w.updatedBy)}</div>` : ''}
          </td>
          <td style="padding:5px 8px;text-align:center;white-space:nowrap;">
            <button class="primary btn-save-row" id="btnSaveRow_${safe(key)}" style="padding:3px 8px;font-size:11px;font-weight:700;height:26px;border-radius:4px;background:#2563eb;color:#fff;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:3px;" onclick="saveWip('${safe(key)}')" title="Save progress for this project only">💾 Save</button>
          </td>
        </tr>`;
      }).join("")}
    </tbody>
  `;

  recalcFinanceSummary();
}

/* GITHUB SYNC (DEPRECATED) */
async function commitToGitHub() {
  return { skipped: true };
}

async function saveFinanceSummary() {
  const m = $("wipMonth")?.value || state.month;
  const exp = parseNum($("summaryExp")?.value);
  const subcontract = parseNum($("summarySubcontract")?.value);
  const divExp = exp - subcontract;
  const mr = parseNum($("summaryMr")?.value);
  const out = parseNum($("summaryOut")?.value);
  const inter = parseNum($("summaryInter")?.value);

  let totalWp = 0;
  document.querySelectorAll("[data-wip-wp]").forEach(el => {
    totalWp += parseNum(el.value);
  });

  const income = totalWp > 0 ? totalWp : (mr + out);
  const profit = income - exp - inter;
  const profitPct = income > 0 ? (profit / income) * 100 : 0;

  const btn = $("saveFinanceSummaryBtn");
  btn.disabled = true;
  btn.textContent = "⏳ Saving...";

  try {
    const userLabel = getCurrentUserDisplayName();
    const nowIso = new Date().toISOString();

    const payload = {
      reportingMonth: m,
      expenditure: exp,
      subcontractPayment: subcontract,
      divisionExpenditure: divExp,
      moneyReceived: mr,
      outstanding: out,
      interdivisional: inter,
      workingProgress: totalWp,
      income,
      profit,
      profitPct: Number(profitPct.toFixed(2)),
      updatedBy: userLabel,
      updatedAt: nowIso
    };

    // 1. Update local state immediately
    const existingIdx = state.financeSummary.findIndex(x => reportingMonth(x) === m);
    if (existingIdx >= 0) state.financeSummary[existingIdx] = payload;
    else state.financeSummary.push(payload);
    renderProfitabilitySection();

    // 2. Update local cache
    const cachedStr = localStorage.getItem("nbri_cached_bootstrap");
    if (cachedStr) {
      try {
        const cached = JSON.parse(cachedStr);
        cached.financeSummary = state.financeSummary;
        localStorage.setItem("nbri_cached_bootstrap", JSON.stringify(cached));
      } catch(e){}
    }

    // 3. Fast Sync to Central Database (Single roundtrip!)
    await apiPost("saveFinanceSummary", payload);
    logSystemAction("FINANCE_SAVE", m, `Saved division financials for ${m} (Income: ${moneyShort(income)}, Profit: ${moneyShort(profit)})`);
    showToast("✓ Division Financials synced successfully!");
  } catch (err) {
    console.error(err);
    showToast("Failed to save financials: " + err.message, true);
    alert("Could not save division financials.\n\n" + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = "💾 Save Division Financials";
  }
}

async function saveWip(singleProjectKey = null) {
  const m = $("wipMonth")?.value || state.month;
  const active = state.projects.filter(p => status(p) !== "Completed");
  const btn = $("saveWipBtn");
  if (btn && !singleProjectKey) {
    btn.disabled = true;
    btn.textContent = "⏳ Saving...";
  }

  const rowBtns = singleProjectKey ? [
    document.getElementById(`btnSaveRow_${singleProjectKey}`),
    document.getElementById(`btnSaveCard_${singleProjectKey}`)
  ].filter(Boolean) : [];

  rowBtns.forEach(b => {
    b.disabled = true;
    b.textContent = "⏳ Saving...";
  });

  try {
    const userLabel = getCurrentUserDisplayName();
    const nowIso = new Date().toISOString();

    const changedRecords = [];

    // Helper to get input values for any project key reliably
    const getRowValues = (key) => {
      const activeScope = (state.matrixViewMode === "cards" ? $("matrixCardList") : $("wipTable")) || document;
      let wpEl = activeScope.querySelector(`input[data-wip-wp="${key}"]`) || document.querySelector(`input[data-wip-wp="${key}"]`);
      let phEl = activeScope.querySelector(`input[data-wip-p="${key}"]`) || document.querySelector(`input[data-wip-p="${key}"]`);
      let advEl = activeScope.querySelector(`input[data-wip-adv="${key}"]`) || document.querySelector(`input[data-wip-adv="${key}"]`);
      let prevEl = activeScope.querySelector(`[data-wip-prev="${key}"]`) || document.querySelector(`[data-wip-prev="${key}"]`);
      let remarksEl = activeScope.querySelector(`input[data-wip-r="${key}"]`) || document.querySelector(`input[data-wip-r="${key}"]`);

      return {
        wp: parseNum(wpEl?.value),
        ph: parseNum(phEl?.value),
        adv: parseNum(advEl?.value),
        prev: parseNum(prevEl?.getAttribute("data-val")),
        remarks: (remarksEl?.value || "").trim(),
        hasInputs: Boolean(wpEl || phEl || advEl || remarksEl)
      };
    };

    const targets = singleProjectKey 
      ? active.filter(p => (projectId(p) === singleProjectKey || projectCode(p) === singleProjectKey))
      : active;

    targets.forEach(p => {
      const code = projectCode(p);
      const pId = projectId(p) || code;
      const key = projectId(p) || code;

      const { wp, ph, adv, prev, remarks, hasInputs } = getRowValues(key);
      if (!hasInputs && !singleProjectKey) return;

      const baseline = currentWip(code, m);
      const basePh = baseline.hasMonthData ? (baseline.physical * 100) : 0;
      const baseWp = baseline.hasMonthData ? baseline.financial : 0;
      const baseAdv = baseline.advance || 0;
      const baseRemarks = (baseline.remarks || "").trim();

      const isChanged = singleProjectKey || (
        Math.abs(ph - basePh) > 0.001 ||
        Math.abs(wp - baseWp) > 0.01 ||
        Math.abs(adv - baseAdv) > 0.01 ||
        remarks !== baseRemarks
      );

      if (isChanged || wp > 0 || ph > 0 || adv > 0 || remarks) {
        changedRecords.push({
          projectId: pId,
          projectCode: code,
          reportingMonth: m,
          physicalWip: ph > 1 ? ph / 100 : ph,
          monthlyProgress: wp,
          workingProgress: wp,
          financialWip: wp,
          advanceReceived: adv,
          prevCumulative: prev,
          totalCumulative: prev + wp,
          remarks: remarks,
          updatedBy: userLabel,
          updatedAt: nowIso
        });
      }
    });

    if (changedRecords.length === 0) {
      showToast(`ℹ️ No project progress data entered to save for ${m}.`);
      return;
    }

    // 2. Update local state immediately: overwrite existing records for this month & project!
    const targetM = (m || "").trim();
    const updatedMap = new Map();
    changedRecords.forEach(r => {
      const k = norm(r.projectCode || r.projectId) + "|" + targetM;
      updatedMap.set(k, r);
    });

    state.wip = state.wip.filter(x => {
      const k = norm(x["Project Code"] ?? x.projectCode ?? x["No"] ?? x.no ?? x["Project ID"] ?? x.projectId) + "|" + reportingMonth(x);
      return !updatedMap.has(k);
    }).concat(changedRecords);

    state.month = m;
    if ($("reportMonth")) $("reportMonth").value = m;
    renderAll();
    showToast(`✓ Saving ${changedRecords.length} updated project(s) locally…`);

    // 3. Update local cache
    const cachedStr = localStorage.getItem("nbri_cached_bootstrap");
    if (cachedStr) {
      try {
        const cached = JSON.parse(cachedStr);
        cached.wip = state.wip;
        cached.reportingMonth = m;
        localStorage.setItem("nbri_cached_bootstrap", JSON.stringify(cached));
      } catch(e){}
    }

    // 4. Send ONLY the changed records to Central Database
    await apiPost("saveMonthlyWIP", { records: changedRecords });
    logSystemAction("WIP_SAVE", m, `Submitted progress records for ${changedRecords.length} project(s)`);
    showToast(`✓ Saved and synchronized ${changedRecords.length} project record(s)!`);

    // 5. Automatically recalculate & background-sync Division Monthly Financial Summary
    try {
      let totalWp = 0;
      state.projects.filter(p => status(p) !== "Completed").forEach(p => {
        const w = currentWip(p, m);
        if (w && w.hasMonthData) totalWp += (w.financial || 0);
      });

      const divFin = getDivisionFinance(m);
      const exp = divFin.expenditure || 0;
      const subcontract = divFin.subcontractPayment || 0;
      const divExp = exp - subcontract;
      const mr = divFin.moneyReceived || 0;
      const out = divFin.outstanding || 0;
      const inter = divFin.interdivisional || 0;
      const income = totalWp > 0 ? totalWp : (mr + out);
      const profit = income - exp - inter;
      const profitPct = income > 0 ? (profit / income) * 100 : 0;

      const finPayload = {
        reportingMonth: m,
        expenditure: exp,
        subcontractPayment: subcontract,
        divisionExpenditure: divExp,
        moneyReceived: mr,
        outstanding: out,
        interdivisional: inter,
        workingProgress: totalWp,
        income,
        profit,
        profitPct: Number(profitPct.toFixed(2)),
        updatedBy: userLabel,
        updatedAt: nowIso
      };

      const existingIdx = state.financeSummary.findIndex(x => reportingMonth(x) === m);
      if (existingIdx >= 0) state.financeSummary[existingIdx] = finPayload;
      else state.financeSummary.push(finPayload);
      renderProfitabilitySection();

      // Background sync to Central Database
      apiPost("saveFinanceSummary", finPayload).catch(e => console.warn("Auto-sync finance summary warning:", e));
    } catch(e) {
      console.warn("Auto-sync division financials calculation:", e);
    }

    rowBtns.forEach(b => {
      b.disabled = false;
      b.textContent = "✓ Saved!";
      b.style.background = "#10b981";
    });
    setTimeout(() => {
      rowBtns.forEach(b => {
        b.textContent = "💾 Save";
        b.style.background = "var(--primary)";
      });
    }, 2500);
  } catch (err) {
    console.error(err);
    showToast("Failed to save progress: " + err.message, true);
    alert("Project progress could not be saved.\n\n" + err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "💾 Save Progress Matrix";
    }
    rowBtns.forEach(b => {
      b.disabled = false;
      if (b.textContent === "⏳ Saving...") b.textContent = "💾 Save";
    });
  }
}

/* =========================================================================
   FINANCIAL EXPOSURE, CONTRACT BACKLOG & BILLING REALIZATION LEDGER
   ========================================================================= */

function getFilteredFinanceProjects() {
  const sq = ($("financeSearch")?.value || "").toLowerCase().trim();
  const yf = ($("financeYearFilter")?.value || "").trim();
  const gf = ($("financeGroupFilter")?.value || "").toLowerCase().trim();
  const ef = $("financeExposureFilter")?.value || "all";
  const sortMode = $("financeSortFilter")?.value || "exposure_desc";

  const mapped = (state.projects || []).map(p => {
    const code = projectCode(p);
    const pYear = registeredYear(p);
    const client = safe(p["Client"]);
    const desc = safe(p["Description"]);
    const wg = safe(p["Working Group"]);
    const sc = scientist(p);
    const st = status(p);
    const isCompleted = st.toLowerCase().includes("completed");

    const est = Number(p["Initial Estimate"] ?? p["Estimate (Without Tax)"] ?? p["Estimate"]) || 0;
    const adv = advanceValue(p);
    const cum = cumulative(code);
    const cumBilled = cum.financial || 0;
    const cumPhysicalPct = (cum.physical || 0) * 100;
    const unbilledExposure = Math.max(0, est - cumBilled);
    const realizationPct = est > 0 ? (cumBilled / est) * 100 : (cumBilled > 0 ? 100 : 0);

    let alignmentType = "on_track";
    let alignmentLabel = "⚡ On Track";
    let alignmentBadge = '<span class="badge in-progress" style="font-size:10px;padding:2px 6px;">⚡ On Track</span>';

    if (isCompleted || realizationPct >= 100) {
      alignmentType = "completed";
      alignmentLabel = "✅ Delivered";
      alignmentBadge = '<span class="badge completed" style="font-size:10px;padding:2px 6px;">✅ Delivered</span>';
    } else if (cumPhysicalPct >= (realizationPct + 20) && est > 0) {
      alignmentType = "lag";
      alignmentLabel = "⚠️ Billing Lag";
      alignmentBadge = '<span class="badge" style="font-size:10px;padding:2px 6px;background:#fef2f2;color:#dc2626;border:1px solid #fca5a5;">⚠️ Billing Lag</span>';
    } else if (adv > cumBilled && adv > 0) {
      alignmentType = "advance";
      alignmentLabel = "⏳ Advance Held";
      alignmentBadge = '<span class="badge" style="font-size:10px;padding:2px 6px;background:#fffbeb;color:#d97706;border:1px solid #fcd34d;">⏳ Advance Held</span>';
    }

    return {
      p,
      code,
      pYear,
      client,
      desc,
      wg,
      sc,
      st,
      est,
      adv,
      cumBilled,
      cumPhysicalPct,
      unbilledExposure,
      realizationPct,
      alignmentType,
      alignmentLabel,
      alignmentBadge,
      isCompleted
    };
  });

  // Apply filters
  const filtered = mapped.filter(item => {
    // 1. Year Filter
    if (yf && item.pYear !== yf) return false;

    // 2. Working Group Filter
    if (gf && !item.wg.toLowerCase().includes(gf)) return false;

    // 3. Search Query
    if (sq) {
      const searchTarget = `${item.code} ${item.pYear} ${item.client} ${item.desc} ${item.wg} ${item.sc} ${item.st}`.toLowerCase();
      if (!searchTarget.includes(sq)) return false;
    }

    // 4. Exposure Category Filter
    if (ef === "unbilled" && item.unbilledExposure <= 0) return false;
    if (ef === "high" && item.est < 5000000 && item.unbilledExposure < 5000000) return false;
    if (ef === "lag" && item.alignmentType !== "lag") return false;
    if (ef === "advance" && item.adv <= 0) return false;
    if (ef === "completed" && !item.isCompleted && item.realizationPct < 100) return false;

    return true;
  });

  // Apply sorting
  filtered.sort((a, b) => {
    if (sortMode === "exposure_desc") return b.unbilledExposure - a.unbilledExposure;
    if (sortMode === "estimate_desc") return b.est - a.est;
    if (sortMode === "billed_desc") return b.cumBilled - a.cumBilled;
    if (sortMode === "pct_desc") return b.realizationPct - a.realizationPct;
    if (sortMode === "code_asc") return a.code.localeCompare(b.code, undefined, { numeric: true, sensitivity: 'base' });
    return b.unbilledExposure - a.unbilledExposure;
  });

  return filtered;
}

function renderFinance() {
  const items = getFilteredFinanceProjects();

  // Aggregate Metrics
  const totalEstimate = items.reduce((s, x) => s + x.est, 0);
  const totalBilled = items.reduce((s, x) => s + x.cumBilled, 0);
  const totalUnbilled = items.reduce((s, x) => s + x.unbilledExposure, 0);
  const totalAdvance = items.reduce((s, x) => s + x.adv, 0);
  const realizationRate = totalEstimate > 0 ? ((totalBilled / totalEstimate) * 100).toFixed(1) : "0.0";
  const highExposureCount = items.filter(x => x.est >= 5000000 || x.unbilledExposure >= 5000000).length;
  const billingLagCount = items.filter(x => x.alignmentType === "lag").length;

  // 1. Render Modern Financial KPI Cards (6 Cards)
  if ($("financeKpis")) {
    $("financeKpis").innerHTML = `
      <div class="card">
        <div class="title">🏛️ Total Portfolio Estimate</div>
        <div class="value" style="color:var(--text-primary);">${money(totalEstimate)}</div>
        <div class="sub">${items.length} Filtered Projects</div>
      </div>
      <div class="card">
        <div class="title">📈 Total Cumulative Billed</div>
        <div class="value" style="color:var(--primary);">${money(totalBilled)}</div>
        <div class="sub">Revenue Realized & Delivered</div>
      </div>
      <div class="card">
        <div class="title">⏳ Unbilled Contract Backlog</div>
        <div class="value" style="color:#2563eb;">${money(totalUnbilled)}</div>
        <div class="sub">Remaining Delivery Exposure</div>
      </div>
      <div class="card">
        <div class="title">💵 Mobilization Advances</div>
        <div class="value" style="color:#059669;">${money(totalAdvance)}</div>
        <div class="sub">Upfront Cash Collected</div>
      </div>
      <div class="card">
        <div class="title">📊 Portfolio Realization Rate</div>
        <div class="value" style="color:#7c3aed;">${realizationRate}%</div>
        <div class="sub">Progress Billing vs. Contract</div>
      </div>
      <div class="card">
        <div class="title">⚠️ Portfolio Risk & Alignment</div>
        <div class="value" style="color:${billingLagCount > 0 ? '#dc2626' : '#059669'};font-size:18px;">
          ${billingLagCount > 0 ? `${billingLagCount} Billing Lags` : '✅ All On Track'}
        </div>
        <div class="sub">${highExposureCount} Projects > Rs. 5M</div>
      </div>
    `;
  }

  // 2. Render Subtitle & Badge
  if ($("financeCountBadge")) $("financeCountBadge").textContent = `${items.length} Projects`;
  if ($("financeTableSubtitle")) {
    $("financeTableSubtitle").textContent = `Portfolio Estimate: ${money(totalEstimate)} · Cumulative Billed: ${money(totalBilled)} · Backlog: ${money(totalUnbilled)}`;
  }

  // 3. Render Financial Ledger Table
  if ($("financeTable")) {
    if (!items.length) {
      $("financeTable").innerHTML = `
        <thead>
          <tr>
            <th>Project</th><th>Year</th><th>Client</th><th>Working Group</th>
            <th>Estimate (Rs.)</th><th>Advance (Rs.)</th><th>Cumulative WIP (Rs.)</th><th>Unbilled Backlog</th><th>Realization %</th><th>Delivery Alignment</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colspan="10" style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px;">No projects match the selected financial filters.</td></tr>
        </tbody>
      `;
      return;
    }

    $("financeTable").innerHTML = `
      <thead>
        <tr>
          <th style="min-width:110px;">Project Code</th>
          <th style="min-width:65px;">Year</th>
          <th style="min-width:140px;">Client & Scope</th>
          <th style="min-width:130px;">Working Group</th>
          <th style="text-align:right;min-width:125px;">Contract Estimate</th>
          <th style="text-align:right;min-width:115px;">Advance Rec.</th>
          <th style="text-align:right;min-width:125px;">Cumulative WIP</th>
          <th style="text-align:right;min-width:125px;">Unbilled Backlog</th>
          <th style="min-width:120px;">Realization %</th>
          <th style="min-width:105px;text-align:center;">Delivery Alignment</th>
        </tr>
      </thead>
      <tbody>
        ${items.map(x => {
          const barWidth = Math.min(100, Math.max(0, x.realizationPct));
          let barColor = "var(--primary)";
          if (x.realizationPct >= 100) barColor = "#059669";
          else if (x.realizationPct < 25) barColor = "#f59e0b";

          return `
          <tr style="border-bottom:1px solid var(--border-color-subtle);">
            <td class="code">
              <b>${safe(x.code)}</b>
              <div style="font-size:10px;color:var(--text-muted);margin-top:2px;">${safe(x.st)}</div>
            </td>
            <td>
              <span class="badge secondary" style="font-size:10.5px;font-weight:700;">${safe(x.pYear)}</span>
            </td>
            <td>
              <b>${safe(x.client)}</b>
              <div style="font-size:11px;color:var(--text-secondary);max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${safe(x.desc)}">
                ${safe(x.desc)}
              </div>
            </td>
            <td>
              <span class="badge">${safe(x.wg)}</span>
              ${x.sc ? `<div style="margin-top:2px;font-size:10.5px;">${staffBadge(x.sc, "🔬")}</div>` : ''}
            </td>
            <td style="text-align:right;font-weight:600;color:var(--text-primary);">
              ${x.est > 0 ? money(x.est) : `<span style="color:var(--text-muted);">—</span>`}
            </td>
            <td style="text-align:right;color:#059669;font-weight:600;">
              ${x.adv > 0 ? money(x.adv) : `<span style="color:var(--text-muted);">0.00</span>`}
            </td>
            <td style="text-align:right;font-weight:700;color:var(--primary);">
              ${x.cumBilled > 0 ? money(x.cumBilled) : `<span style="color:var(--text-muted);">0.00</span>`}
            </td>
            <td style="text-align:right;font-weight:700;color:#2563eb;">
              ${x.unbilledExposure > 0 ? money(x.unbilledExposure) : `<span style="color:#059669;">✅ Billed</span>`}
            </td>
            <td>
              <div style="display:flex;align-items:center;gap:6px;">
                <div class="bar" style="height:6px;width:75px;background:var(--bg-surface-subtle);border-radius:3px;overflow:hidden;display:inline-block;">
                  <span style="display:block;height:100%;background:${barColor};width:${barWidth}%;"></span>
                </div>
                <b style="font-size:11px;">${x.realizationPct.toFixed(0)}%</b>
              </div>
            </td>
            <td style="text-align:center;">
              ${x.alignmentBadge}
            </td>
          </tr>
        `;}).join("")}
      </tbody>
    `;
  }
}
window.renderFinance = renderFinance;

function exportFinanceCSV() {
  const items = getFilteredFinanceProjects();
  if (!items.length) {
    showToast("No financial records to export.", true);
    return;
  }

  const headers = [
    "Project Code",
    "Registered Year",
    "Client",
    "Description",
    "Working Group",
    "Responsible Scientist",
    "Status",
    "Initial Estimate (Rs.)",
    "Advance Received (Rs.)",
    "Cumulative WIP Billed (Rs.)",
    "Unbilled Backlog (Rs.)",
    "Realization Pct (%)",
    "Delivery Alignment"
  ];

  const csvRows = [headers.join(",")];

  items.forEach(x => {
    const row = [
      `"${safe(x.code).replace(/"/g, '""')}"`,
      `"${safe(x.pYear)}"`,
      `"${safe(x.client).replace(/"/g, '""')}"`,
      `"${safe(x.desc).replace(/"/g, '""')}"`,
      `"${safe(x.wg).replace(/"/g, '""')}"`,
      `"${safe(x.sc).replace(/"/g, '""')}"`,
      `"${safe(x.st).replace(/"/g, '""')}"`,
      x.est.toFixed(2),
      x.adv.toFixed(2),
      x.cumBilled.toFixed(2),
      x.unbilledExposure.toFixed(2),
      x.realizationPct.toFixed(2),
      `"${safe(x.alignmentLabel)}"`
    ];
    csvRows.push(row.join(","));
  });

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const dateStr = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `NBRO_Financial_Exposure_Ledger_${dateStr}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("✓ Financial Exposure Ledger exported to CSV!");
}
window.exportFinanceCSV = exportFinanceCSV;

function openAboutDialog() {
  const dlg = $("aboutDialog");
  if (dlg) {
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "true");
  }
}
window.openAboutDialog = openAboutDialog;

function openNew() {
  const role = state.user ? (state.user.role || "Viewer") : "Viewer";
  if (role === "Viewer") {
    showToast("Action restricted. Please sign in with Editor or Admin privileges to create projects.", true);
    return;
  }
  fillFilters();
  $("dialogTitle").textContent = "➕ Add New Project";
  $("editIndex").value = "";
  $("projectForm").reset();
  if ($("fYear")) $("fYear").value = new Date().getFullYear();
  renderEngineerChecklist([]);
  
  // Re-enable form inputs in case previous view was read-only
  ["fCode", "fYear", "fClient", "fDesc", "fGroup", "fEstimate", "fAdvance", "fStatus"].forEach(id => {
    if ($(id)) $(id).disabled = false;
  });
  if ($("saveProjectBtn")) {
    $("saveProjectBtn").style.display = "inline-flex";
    $("saveProjectBtn").textContent = "➕ Create Project";
  }

  if ($("fEngineerDropdownPanel")) $("fEngineerDropdownPanel").style.display = "none";
  if ($("fCodeStatus")) $("fCodeStatus").style.display = "none";
  $("projectDialog").showModal();
}

function editProject(id) {
  fillFilters();
  const p = state.projects.find(x => projectId(x) === String(id) || projectCode(x) === String(id));
  if (!p) return;
  const role = state.user ? (state.user.role || "Viewer") : "Viewer";
  const isViewer = role === "Viewer";

  $("dialogTitle").innerHTML = isViewer
    ? `📋 Project Details: <b>${safe(projectCode(p))}</b>`
    : `✏️ Modify Project: <b>${safe(projectCode(p))}</b>`;
  $("editIndex").value = projectId(p);
  $("fCode").value = projectCode(p);
  if ($("fYear")) $("fYear").value = registeredYear(p);
  $("fClient").value = safe(p["Client"]);
  $("fDesc").value = safe(p["Description"]);

  // Set Working Group Leader from Leader options
  const grpVal = safe(p["Working Group"] || projectLeader(p)).trim();
  if ($("fGroup")) {
    const leadersList = (state.knownUsers || []).filter(u => isStaffLeader(u));
    const matched = leadersList.find(l => {
      const s = (l.shortName || l.fullName || "").toLowerCase();
      return s === grpVal.toLowerCase() || s.includes(grpVal.toLowerCase()) || grpVal.toLowerCase().includes(s);
    });
    if (matched) {
      const sName = matched.shortName || (matched.fullName ? matched.fullName.split(" ")[0] : matched.fullName);
      const matchOpt = Array.from($("fGroup").options).find(o => o.value.toLowerCase() === sName.toLowerCase() || o.text.toLowerCase().includes(sName.toLowerCase()));
      if (matchOpt) $("fGroup").value = matchOpt.value;
      else $("fGroup").value = sName;
    } else {
      $("fGroup").value = grpVal;
    }
  }

  // Multi-scientist list population
  renderEngineerChecklist(scientist(p));
  if ($("fEngineerDropdownPanel")) $("fEngineerDropdownPanel").style.display = "none";

  $("fEstimate").value = formatInputCurrency(p["Initial Estimate"] ?? p["Estimate"] ?? p["Estimate (Without Tax)"], 2);
  $("fAdvance").value = formatInputCurrency(p["Advance Amount"] ?? p["Advance Received"], 2);
  $("fStatus").value = status(p);

  // Form field state (Read-Only for Viewer vs Editable for Editors/Admins)
  ["fCode", "fYear", "fClient", "fDesc", "fGroup", "fEstimate", "fAdvance", "fStatus"].forEach(fId => {
    if ($(fId)) $(fId).disabled = isViewer;
  });

  // Scientist checkboxes disabled for Viewer
  document.querySelectorAll("#fEngineerCheckList input[type='checkbox']").forEach(cb => {
    cb.disabled = isViewer;
  });
  document.querySelectorAll(".remove-chip-btn").forEach(b => {
    b.style.display = isViewer ? "none" : "inline-flex";
  });

  if ($("saveProjectBtn")) {
    $("saveProjectBtn").style.display = isViewer ? "none" : "inline-flex";
    $("saveProjectBtn").textContent = "💾 Update Existing Project";
  }

  if ($("fCodeStatus")) {
    $("fCodeStatus").style.display = "block";
    if (isViewer) {
      $("fCodeStatus").style.background = "var(--bg-surface-subtle)";
      $("fCodeStatus").style.color = "var(--text-secondary)";
      $("fCodeStatus").style.border = "1px solid var(--border-color)";
      $("fCodeStatus").innerHTML = `👁️ <b>Read-Only Mode</b> — Viewers cannot modify project records. Please Sign In to edit.`;
    } else {
      $("fCodeStatus").style.background = "var(--primary-subtle)";
      $("fCodeStatus").style.color = "var(--primary-text)";
      $("fCodeStatus").style.border = "1px solid var(--primary)";
      $("fCodeStatus").innerHTML = `ℹ️ <b>Existing project found (${safe(projectCode(p))})</b> — Loaded data for editing.`;
    }
  }
  $("projectDialog").showModal();
}

async function saveProject(e) {
  e.preventDefault();
  const role = state.user ? (state.user.role || "Viewer") : "Viewer";
  if (role === "Viewer") {
    showToast("Action restricted. Viewers cannot edit or save projects.", true);
    return;
  }
  const id = $("editIndex").value;
  const stVal = $("fStatus").value;
  const codeVal = $("fCode").value.trim();
  const yearVal = $("fYear")?.value?.trim() || String(new Date().getFullYear());
  const engineerVal = $("fEngineer")?.value || "";
  const groupVal = $("fGroup")?.value || "";
  const userLabel = getCurrentUserDisplayName();
  const nowIso = new Date().toISOString();

  const project = {
    "Project Code": codeVal,
    "Registered Year": yearVal,
    "Year": yearVal,
    "Client": $("fClient").value,
    "Description": $("fDesc").value,
    "Working Group": groupVal,
    "Responsible Engineer": engineerVal,
    "Initial Estimate": parseNum($("fEstimate").value),
    "Advance Amount": parseNum($("fAdvance").value),
    "Status": stVal,
    "Updated By": userLabel,
    "Updated At": nowIso
  };

  const btn = $("saveProjectBtn");
  btn.disabled = true;
  btn.textContent = "⏳ Saving...";

  try {
    // 1. Update local state immediately
    const existingIdx = state.projects.findIndex(p => projectCode(p) === project["Project Code"] || projectId(p) === (id || codeVal));
    if (existingIdx >= 0) state.projects[existingIdx] = { ...state.projects[existingIdx], ...project };
    else state.projects.push(project);

    deriveLookups();
    fillFilters();
    $("projectDialog").close();
    renderAll();
    showToast(id ? "✓ Project updated locally, syncing with central database…" : "✓ Project created locally, syncing with central database…");

    // 2. Update local cache
    const cachedStr = localStorage.getItem("nbri_cached_bootstrap");
    if (cachedStr) {
      try {
        const cached = JSON.parse(cachedStr);
        cached.projects = state.projects;
        localStorage.setItem("nbri_cached_bootstrap", JSON.stringify(cached));
      } catch(e){}
    }

    // 3. Fast Sync to Central Database (Single roundtrip!)
    await apiPost(id ? "updateProject" : "createProject", { project });
    logSystemAction("PROJECT_SAVE", codeVal, (id ? "Modified project metadata" : "Registered new project") + ` (${project.Client || ''})`);
    showToast(id ? "✓ Project record updated successfully!" : "✓ New project registered successfully!");
  } catch (err) {
    console.error(err);
    showToast("Save failed: " + err.message, true);
    alert("Project could not be saved.\n\n" + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = id ? "💾 Update Existing Project" : "➕ Create Project";
  }
}

/* LIVE CURRENCY FORMATTERS & INPUT HANDLERS */
function formatCurrencyInputLive(el) {
  if (!el) return;
  const raw = el.value.replace(/[^0-9.]/g, "");
  if (!raw) {
    el.value = "";
    return;
  }
  const parts = raw.split(".");
  const intPart = parts[0] ? Number(parts[0]).toLocaleString("en-US") : "0";
  const decPart = parts.length > 1 ? "." + parts[1].slice(0, 2) : (raw.endsWith(".") ? "." : "");
  el.value = intPart + decPart;
}

function formatCurrencyInputBlur(el) {
  if (!el || !el.value) return;
  const n = parseNum(el.value);
  if (n > 0 || el.value.trim() !== "") {
    el.value = n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}

/* PROJECT MODAL CRUD WITH AUTO-DETECT & PRE-FILL */
function handleProjectCodeInput(code) {
  const cNorm = norm(code);
  const statusEl = $("fCodeStatus");
  const dialogTitle = $("dialogTitle");
  const saveBtn = $("saveProjectBtn");

  if (!cNorm) {
    if (statusEl) statusEl.style.display = "none";
    if (dialogTitle) dialogTitle.textContent = "➕ Add New Project";
    if (saveBtn) saveBtn.textContent = "➕ Create Project";
    $("editIndex").value = "";
    return;
  }

  const existing = state.projects.find(p => norm(projectCode(p)) === cNorm || norm(projectId(p)) === cNorm);
  if (existing) {
    $("editIndex").value = projectId(existing);
    $("fClient").value = safe(existing["Client"]);
    $("fDesc").value = safe(existing["Description"]);
    $("fGroup").value = safe(existing["Working Group"]);
    $("fEngineer").value = safe(scientist(existing));
    $("fEstimate").value = formatInputCurrency(existing["Initial Estimate"] ?? existing["Estimate"] ?? existing["Estimate (Without Tax)"], 2);
    $("fAdvance").value = formatInputCurrency(existing["Advance Amount"] ?? existing["Advance Received"], 2);
    $("fStatus").value = status(existing);

    if (dialogTitle) dialogTitle.innerHTML = `✏️ Modify Project: <b>${safe(projectCode(existing))}</b>`;
    if (saveBtn) saveBtn.textContent = "💾 Update Existing Project";
    if (statusEl) {
      statusEl.style.display = "block";
      statusEl.style.background = "var(--primary-subtle)";
      statusEl.style.color = "var(--primary-text)";
      statusEl.style.border = "1px solid var(--primary)";
      statusEl.innerHTML = `ℹ️ <b>Existing project found (${safe(projectCode(existing))})</b> — Loaded data for modifying.`;
    }
  } else {
    $("editIndex").value = "";
    if (dialogTitle) dialogTitle.textContent = "➕ Add New Project: " + code;
    if (saveBtn) saveBtn.textContent = "➕ Create New Project";
    if (statusEl) {
      statusEl.style.display = "block";
      statusEl.style.background = "var(--success-subtle)";
      statusEl.style.color = "var(--success-text)";
      statusEl.style.border = "1px solid var(--success)";
      statusEl.innerHTML = `✨ <b>New project code.</b> Ready to create.`;
    }
  }
}

/* EXPORT JSON */
async function exportJSON() {
  const blob = new Blob([JSON.stringify({
    projects: state.projects,
    wip: state.wip,
    finance: state.finance,
    exportedAt: new Date().toISOString()
  }, null, 2)], { type: "application/json" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `nbro-project-register-${state.month}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  showToast("JSON export generated successfully.");
}

/* EXPORT A3 LANDSCAPE DIVISION MONTHLY PROGRESS REPORT */
function exportWipA3Pdf() {
  const m = state.month || "2026-06";
  const [yStr, mNumStr] = m.split("-");
  const year = parseInt(yStr, 10) || 2026;
  const prevYear = year - 1;
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const mIndex = parseInt(mNumStr, 10) - 1;
  const monthName = (mIndex >= 0 && mIndex < 12) ? monthNames[mIndex] : m;

  const divFin = getDivisionFinance(m);
  const activeProjects = (state.projects || []).filter(p => {
    const st = status(p).toLowerCase().trim();
    return st !== "completed";
  }).sort((a, b) => projectCode(a).localeCompare(projectCode(b), undefined, { numeric: true, sensitivity: 'base' }));

  const fmt = n => {
    const num = Number(n) || 0;
    if (num === 0) return "-";
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  const fmtAlways = n => {
    const num = Number(n) || 0;
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  let totalEstNoTax = 0;
  let totalBase2025 = 0;
  let totalAdv2026 = 0;
  let totalMonthProgress = 0;
  let totalCum2026 = 0;
  let totalCumulative = 0;

  const rowsHtml = activeProjects.map(p => {
    const code = projectCode(p);
    const desc = p["Description"] || "";
    const client = p["Client"] || "";
    const estNoTax = estimateValue(p);
    const adv2026 = advanceValue(p, m);
    const advDate = p["Advance Date"] || p["Advance Received Date"] || "";
    const w = currentWip(p, m);
    const prevCum = prevCumulativeValue(p, m);
    const monthProg = w.hasMonthData ? w.financial : 0;
    const totCum = prevCum + monthProg;
    const cumYear = (w.hasMonthData ? w.financial : 0);

    totalEstNoTax += (estNoTax || 0);
    totalBase2025 += (prevCum || 0);
    totalAdv2026 += (adv2026 || 0);
    totalMonthProgress += (monthProg || 0);
    totalCum2026 += (cumYear || 0);
    totalCumulative += (totCum || 0);

    const sc = scientist(p);
    const lead = projectLeader(p);
    let engStr = "";
    if (sc && lead && sc !== lead) {
      engStr = `${staffDisplayName(sc)} / ${staffDisplayName(lead)}`;
    } else {
      engStr = staffDisplayName(sc || lead || "Unassigned");
    }

    return `
      <tr>
        <td class="col-no"><span class="code-pill">${safe(code)}</span></td>
        <td class="col-desc">
          <div class="desc-text">${safe(desc)}</div>
        </td>
        <td class="col-client"><div class="client-name">${safe(client)}</div></td>
        <td class="col-num">${fmt(estNoTax)}</td>
        <td class="col-num col-shade-peach">${fmt(prevCum)}</td>
        <td class="col-num col-shade-blue">${fmt(adv2026)}</td>
        <td class="col-date col-shade-blue">${safe(advDate)}</td>
        <td class="col-num col-shade-blue highlight-month">${fmt(monthProg)}</td>
        <td class="col-num col-shade-blue">${fmt(cumYear)}</td>
        <td class="col-num col-shade-mint bold-total">${fmt(totCum)}</td>
        <td class="col-eng">
          <span class="eng-name">${safe(engStr)}</span>
        </td>
      </tr>
    `;
  }).join("");

  const printDocHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>NBRO Division Monthly Progress — ${safe(monthName)} ${year}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A3 landscape;
      margin: 8mm 10mm;
    }
    * { box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 10px;
      color: #1e293b;
      margin: 0;
      padding: 12px;
      background: #f8fafc;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* TOP FLOATING ACTION BAR */
    .toolbar-no-print {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      color: #fff;
      padding: 10px 20px;
      border-radius: 8px;
      margin-bottom: 14px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.15);
    }
    .toolbar-title {
      font-weight: 700;
      font-size: 13.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toolbar-no-print button {
      background: #2563eb;
      color: #fff;
      border: none;
      padding: 7px 16px;
      font-size: 12.5px;
      font-weight: 700;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background 0.15s ease;
    }
    .toolbar-no-print button:hover {
      background: #1d4ed8;
    }
    .toolbar-no-print button.secondary {
      background: #334155;
    }
    .toolbar-no-print button.secondary:hover {
      background: #475569;
    }

    .report-sheet {
      background: #fff;
      border-radius: 8px;
      padding: 16px 20px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
      border: 1px solid #e2e8f0;
    }

    /* EXECUTIVE HEADER LAYOUT */
    .report-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 14px;
      gap: 24px;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 12px;
    }
    .header-titles {
      flex: 1;
    }
    .org-subtitle {
      font-size: 9.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #64748b;
      margin-bottom: 2px;
    }
    .header-titles h1 {
      margin: 0;
      font-size: 16px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.3px;
    }
    .header-titles h2 {
      margin: 4px 0 0;
      font-size: 12.5px;
      font-weight: 600;
      color: #0284c7;
    }

    /* MODERN DIVISION FINANCIAL SUMMARY BOX */
    .summary-card {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      overflow: hidden;
      background: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .summary-box {
      border-collapse: collapse;
      font-size: 10px;
    }
    .summary-box td {
      border: 1px solid #e2e8f0;
      padding: 3.5px 9px;
      white-space: nowrap;
    }
    .summary-box td.label {
      font-weight: 600;
      background: #f8fafc;
      color: #475569;
      font-size: 9.5px;
    }
    .summary-box td.val {
      text-align: right;
      font-variant-numeric: tabular-nums;
      font-weight: 700;
      color: #0f172a;
      min-width: 100px;
      font-size: 10px;
    }
    .summary-box td.highlight-wp {
      background: #f0f9ff;
      color: #0369a1;
      font-weight: 800;
    }
    .summary-box td.highlight-profit {
      background: #f0fdf4;
      color: #15803d;
      font-weight: 800;
    }

    /* MODERN A3 DATA MATRIX TABLE */
    table.data-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      table-layout: fixed;
      font-size: 9.5px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      overflow: hidden;
    }
    table.data-table th, table.data-table td {
      border-right: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
      padding: 4px 6px;
      vertical-align: middle;
      line-height: 1.3;
    }
    table.data-table th:last-child, table.data-table td:last-child {
      border-right: none;
    }
    table.data-table th {
      background: #0f172a;
      color: #f8fafc;
      font-weight: 700;
      text-align: center;
      font-size: 9px;
      letter-spacing: 0.1px;
      padding: 5px 6px;
    }
    table.data-table thead tr:first-child th {
      border-bottom: 1px solid rgba(255,255,255,0.15);
    }
    table.data-table tbody tr {
      background: #fff;
    }
    table.data-table tbody tr:nth-child(even) {
      background: #f8fafc;
    }
    table.data-table tbody tr:hover {
      background: #f1f5f9;
    }

    /* SPECIFIC COLUMN WIDTHS & STYLING */
    .col-no { width: 68px; text-align: center; white-space: nowrap; }
    .col-desc { width: 275px; }
    .col-client { width: 110px; }
    .col-num { width: 102px; text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .col-date { width: 75px; text-align: center; font-size: 9px; white-space: nowrap; }
    .col-eng { width: 165px; font-size: 9px; }

    .code-pill {
      font-weight: 800;
      color: #0f172a;
      background: #e2e8f0;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 9.5px;
      display: inline-block;
    }
    .desc-text {
      font-size: 9px;
      color: #334155;
      line-height: 1.3;
      word-break: break-word;
    }
    .client-name {
      font-weight: 600;
      color: #0f172a;
      font-size: 9.5px;
      word-break: break-word;
    }
    .eng-name {
      font-size: 9px;
      color: #334155;
      font-weight: 500;
      word-break: break-word;
    }

    /* MODERN SECTION SHADING */
    .col-shade-peach { background: rgba(254, 243, 199, 0.4) !important; color: #78350f; font-weight: 600; }
    .col-shade-blue { background: rgba(239, 246, 255, 0.6) !important; color: #1e3a8a; }
    .col-shade-mint { background: rgba(236, 253, 245, 0.7) !important; color: #064e3b; }
    
    th.th-peach { background: #78350f !important; color: #fff !important; }
    th.th-blue { background: #1e3a8a !important; color: #fff !important; }
    th.th-mint { background: #064e3b !important; color: #fff !important; }

    .highlight-month { font-weight: 800; color: #0284c7 !important; }
    .bold-total { font-weight: 800; color: #0f172a; }

    /* TOTALS FOOTER */
    table.data-table tfoot tr {
      background: #0f172a !important;
      color: #fff !important;
    }
    table.data-table tfoot td {
      border-top: 2px solid #0f172a;
      border-bottom: none;
      font-weight: 800;
      font-size: 9.5px;
      color: #fff;
      padding: 6px;
    }
    table.data-table tfoot td.col-shade-peach { background: #92400e !important; color: #fff !important; }
    table.data-table tfoot td.col-shade-blue { background: #1e40af !important; color: #fff !important; }
    table.data-table tfoot td.col-shade-mint { background: #065f46 !important; color: #fff !important; }

    @media print {
      body { padding: 0; background: #fff; }
      .toolbar-no-print { display: none !important; }
      .report-sheet { border: none; padding: 0; box-shadow: none; }
      table.data-table { page-break-after: auto; }
      tr { page-break-inside: avoid; page-break-after: auto; }
      thead { display: table-header-group; }
      tfoot { display: table-footer-group; }
    }
  </style>
</head>
<body>
  <div class="toolbar-no-print">
    <div class="toolbar-title">
      📄 NBRO Geotechnical Engineering Division — Monthly Progress A3 Report (${safe(monthName)} ${year})
    </div>
    <div style="display:flex;gap:10px;">
      <button onclick="window.print()">🖨️ Print / Save as PDF</button>
      <button class="secondary" onclick="window.close()">✕ Close</button>
    </div>
  </div>

  <div class="report-sheet">
    <div class="report-header">
      <div class="header-titles">
        <div class="org-subtitle">National Building Research Institute (NBRI)</div>
        <h1>Geotechnical Engineering Division</h1>
        <h2>Work in Progress and Outstanding for the Month of ${safe(monthName)}, ${year}</h2>
      </div>

      <div class="summary-card">
        <table class="summary-box">
          <tr>
            <td class="label">Total Expenditure</td>
            <td class="val">${fmtAlways(divFin.expenditure)}</td>
            <td class="label">Money Received</td>
            <td class="val">${fmtAlways(divFin.moneyReceived)}</td>
          </tr>
          <tr>
            <td class="label">Subcontract Payment</td>
            <td class="val">${fmtAlways(divFin.subcontractPayment || 0)}</td>
            <td class="label">Outstanding</td>
            <td class="val">${fmtAlways(divFin.outstanding)}</td>
          </tr>
          <tr>
            <td class="label">Division Expenditure</td>
            <td class="val">${fmtAlways(divFin.divisionExpenditure || (divFin.expenditure - (divFin.subcontractPayment || 0)))}</td>
            <td class="label">Interdivisional</td>
            <td class="val">${fmtAlways(divFin.interdivisional)}</td>
          </tr>
          <tr>
            <td class="label highlight-wp">Working Progress</td>
            <td class="val highlight-wp">${fmtAlways(divFin.workingProgress || totalMonthProgress)}</td>
            <td colspan="2" rowspan="4" style="background:#f8fafc;vertical-align:middle;text-align:center;padding:6px;">
              <div style="font-size:9.5px;color:#64748b;font-weight:600;">Monthly Performance</div>
              <div style="font-size:15px;font-weight:800;color:${divFin.profit < 0 ? '#dc2626' : '#15803d'};margin-top:2px;">
                ${divFin.profit < 0 ? `(${Math.abs(divFin.profitPct || 0).toFixed(1)}% Deficit)` : `${(divFin.profitPct || 0).toFixed(1)}% Margin`}
              </div>
            </td>
          </tr>
          <tr>
            <td class="label">Income</td>
            <td class="val">${fmtAlways(divFin.income)}</td>
          </tr>
          <tr>
            <td class="label">Project Income</td>
            <td class="val">${fmtAlways(divFin.projectIncome || (divFin.income - divFin.moneyReceived))}</td>
          </tr>
          <tr>
            <td class="label highlight-profit">${divFin.profit < 0 ? 'Net Deficit' : 'Net Profit'}</td>
            <td class="val highlight-profit" style="color:${divFin.profit < 0 ? '#dc2626' : '#15803d'};">${fmtAlways(divFin.profit)}</td>
          </tr>
        </table>
      </div>
    </div>

    <table class="data-table" id="a3PrintTable">
      <thead>
        <tr>
          <th rowspan="2">No</th>
          <th rowspan="2">Description</th>
          <th rowspan="2">Client</th>
          <th rowspan="2">Estimate (Without Tax)</th>
          <th rowspan="2" class="th-peach">Total Cumulative up to ${prevYear}</th>
          <th colspan="2" class="th-blue">Advance received (${year})</th>
          <th rowspan="2" class="th-blue">${safe(monthName)}</th>
          <th rowspan="2" class="th-blue">Cumulative ${year}</th>
          <th rowspan="2" class="th-mint">Total Cumulative up to ${year}</th>
          <th rowspan="2">Project Engineer</th>
        </tr>
        <tr>
          <th class="th-blue">(Without Tax)</th>
          <th class="th-blue">Date</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="text-align:center;font-weight:800;">TOTALS</td>
          <td class="col-num">${fmtAlways(totalEstNoTax)}</td>
          <td class="col-num col-shade-peach">${fmtAlways(totalBase2025)}</td>
          <td class="col-num col-shade-blue">${fmtAlways(totalAdv2026)}</td>
          <td class="col-date col-shade-blue">-</td>
          <td class="col-num col-shade-blue highlight-month">${fmtAlways(totalMonthProgress)}</td>
          <td class="col-num col-shade-blue">${fmtAlways(totalCum2026)}</td>
          <td class="col-num col-shade-mint bold-total">${fmtAlways(totalCumulative)}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </div>
</body>
</html>`;

  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(printDocHtml);
    printWindow.document.close();
  } else {
    showToast("Pop-up blocked. Please allow pop-ups to view/export the A3 PDF.", true);
  }
}

/* COMMAND PALETTE */
function openCmdPalette() {
  const modal = $("cmdPaletteBackdrop");
  const input = $("cmdSearchInput");
  modal.classList.add("active");
  input.value = "";
  renderCmdResults("");
  input.focus();
}

function closeCmdPalette() {
  $("cmdPaletteBackdrop").classList.remove("active");
}

function renderCmdResults(query) {
  const container = $("cmdResults");
  const q = query.toLowerCase().trim();

  const actions = [
    { title: "➕ Add New Project", meta: "Action", action: () => { closeCmdPalette(); openNew(); } },
    { title: "ℹ️ System Information, Help Guide & Version Summary", meta: "Help", action: () => { closeCmdPalette(); openAboutDialog(); } },
    { title: "📊 Switch to Dashboard", meta: "Navigation", action: () => { switchTab("dashboard"); closeCmdPalette(); } },
    { title: "📁 Switch to Projects Table", meta: "Navigation", action: () => { switchTab("projects"); setViewMode("table"); closeCmdPalette(); } },
    { title: "📌 Switch to Kanban Board", meta: "Navigation", action: () => { switchTab("projects"); setViewMode("kanban"); closeCmdPalette(); } },
    { title: "📈 Switch to Monthly WIP", meta: "Navigation", action: () => { switchTab("wip"); closeCmdPalette(); } },
    { title: "💰 Switch to Financial Overview", meta: "Navigation", action: () => { switchTab("finance"); closeCmdPalette(); } },
    { title: "🌓 Toggle Dark / Light Theme", meta: "Preference", action: () => { toggleTheme(); closeCmdPalette(); } },
    { title: "📥 Export Complete Data Backup (JSON)", meta: "Data", action: () => { exportJSON(); closeCmdPalette(); } }
  ];

  let projectResults = state.projects.map(p => ({
    title: `${projectCode(p)} • ${safe(p["Client"])}`,
    meta: `${safe(p["Working Group"])} | Eng. ${safe(p["Responsible Engineer"])} | ${status(p)}`,
    action: () => {
      closeCmdPalette();
      switchTab("projects");
      editProject(projectId(p));
    }
  }));

  if (q) {
    projectResults = projectResults.filter(x => x.title.toLowerCase().includes(q) || x.meta.toLowerCase().includes(q));
    state.cmdFilteredItems = [...actions.filter(a => a.title.toLowerCase().includes(q)), ...projectResults];
  } else {
    state.cmdFilteredItems = [...actions, ...projectResults.slice(0, 10)];
  }

  state.cmdSelectedIndex = 0;
  if (!state.cmdFilteredItems.length) {
    container.innerHTML = `<div style="padding:20px;text-align:center;color:var(--text-muted);">No matching projects or actions found.</div>`;
    return;
  }

  container.innerHTML = state.cmdFilteredItems.map((item, idx) => `
    <div class="cmd-item ${idx === 0 ? 'selected' : ''}" data-idx="${idx}" onclick="executeCmdIndex(${idx})">
      <div>
        <div class="cmd-item-title">${item.title}</div>
        <div class="cmd-item-meta">${item.meta}</div>
      </div>
      <span style="font-size:11px;color:var(--text-muted);">↵ Select</span>
    </div>
  `).join("");
}

function executeCmdIndex(idx) {
  if (state.cmdFilteredItems[idx]) {
    state.cmdFilteredItems[idx].action();
  }
}

function switchTab(viewId) {
  if (viewId === "admin" && !isUserSystemAdmin()) {
    showToast("Access restricted: System Admin only.", true);
    viewId = "dashboard";
  }
  document.querySelectorAll(".tab").forEach(x => {
    x.classList.toggle("active", x.dataset.view === viewId);
  });
  document.querySelectorAll(".view").forEach(x => {
    x.classList.toggle("active", x.id === viewId);
  });
  try {
    if (viewId === "dashboard") renderExecutiveCharts();
    else if (viewId === "projects") { if (state.viewMode === "kanban") renderKanban(); else renderProjects(); }
    else if (viewId === "wip") renderWip();
    else if (viewId === "finance") renderFinance();
    else if (viewId === "admin") renderAdminDashboard();
  } catch (e) {
    console.error("[NBRI] switchTab render error:", e);
  }
}

/* EVENT LISTENERS */
document.querySelectorAll(".tab").forEach(b => {
  b.onclick = () => switchTab(b.dataset.view);
});

$("themeToggle").onclick = toggleTheme;
$("cmdPaletteTrigger").onclick = openCmdPalette;
$("cmdPaletteBackdrop").onclick = e => { if (e.target === $("cmdPaletteBackdrop")) closeCmdPalette(); };

$("cmdSearchInput").oninput = e => renderCmdResults(e.target.value);
$("cmdSearchInput").onkeydown = e => {
  if (e.key === "Escape") closeCmdPalette();
  else if (e.key === "Enter") {
    executeCmdIndex(state.cmdSelectedIndex);
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    state.cmdSelectedIndex = Math.min(state.cmdFilteredItems.length - 1, state.cmdSelectedIndex + 1);
    updateCmdHighlight();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    state.cmdSelectedIndex = Math.max(0, state.cmdSelectedIndex - 1);
    updateCmdHighlight();
  }
};

function updateCmdHighlight() {
  document.querySelectorAll(".cmd-item").forEach((el, idx) => {
    el.classList.toggle("selected", idx === state.cmdSelectedIndex);
    if (idx === state.cmdSelectedIndex) el.scrollIntoView({ block: "nearest" });
  });
}

window.addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    openCmdPalette();
  }
});

$("viewModeTable").onclick = () => setViewMode("table");
$("viewModeKanban").onclick = () => setViewMode("kanban");

["search", "yearFilter", "statusFilter", "groupFilter", "engineerFilter", "projectSortFilter"].forEach(id => {
  const el = $(id);
  if (el && typeof el.addEventListener === "function") {
    el.addEventListener("input", () => {
      if (state.viewMode === "kanban") renderKanban();
      else renderProjects();
    });
    el.addEventListener("change", () => {
      if (state.viewMode === "kanban") renderKanban();
      else renderProjects();
    });
  }
});

["financeSearch", "financeYearFilter", "financeGroupFilter", "financeExposureFilter", "financeSortFilter"].forEach(id => {
  const el = $(id);
  if (el && typeof el.addEventListener === "function") {
    el.addEventListener("input", renderFinance);
    el.addEventListener("change", renderFinance);
  }
});

function handleWipMonthChange(newMonth) {
  if (!newMonth) return;
  state.month = newMonth;
  if ($("reportMonth")) $("reportMonth").value = newMonth;
  if ($("wipMonth")) $("wipMonth").value = newMonth;
  renderAll();
}

if ($("reportMonth")) $("reportMonth").onchange = e => handleWipMonthChange(e.target.value);
if ($("wipMonth")) $("wipMonth").onchange = e => handleWipMonthChange(e.target.value);
$("saveWipBtn").onclick = saveWip;
$("saveFinanceSummaryBtn").onclick = saveFinanceSummary;
$("newProjectBtn").onclick = openNew;
$("projectForm").addEventListener("submit", saveProject);
$("exportBtn").onclick = exportJSON;

// Project Code Live Auto-Detection (New vs Modify)
$("fCode")?.addEventListener("input", e => handleProjectCodeInput(e.target.value));
$("fCode")?.addEventListener("change", e => handleProjectCodeInput(e.target.value));

// Currency Input Auto-Formatting with Commas
["fEstimate", "fAdvance", "summaryExp", "summaryMr", "summaryOut", "summaryInter"].forEach(id => {
  const el = $(id);
  if (el) {
    el.addEventListener("input", () => formatCurrencyInputLive(el));
    el.addEventListener("blur", () => formatCurrencyInputBlur(el));
  }
});

// Dialog Backdrop Dismissal Listeners
$("projectDialog")?.addEventListener("click", e => {
  const rect = $("projectDialog").getBoundingClientRect();
  const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
  if (!isInDialog) $("projectDialog").close();
});

$("matrixSearch")?.addEventListener("input", renderWip);
$("matrixScientistFilter")?.addEventListener("change", renderWip);
$("matrixGroupFilter")?.addEventListener("change", renderWip);
$("matrixWipFilter")?.addEventListener("change", renderWip);
$("matrixSortSelect")?.addEventListener("change", renderWip);
$("matrixViewCards")?.addEventListener("click", () => setMatrixViewMode("cards"));
$("matrixViewTable")?.addEventListener("click", () => setMatrixViewMode("table"));
$("dashYearSelect")?.addEventListener("change", e => renderExecutiveCharts(e.target.value));

// Global event handlers & calculations
window.handleDragStart = handleDragStart;
window.handleDragOver = handleDragOver;
window.handleDragLeave = handleDragLeave;
window.handleDrop = handleDrop;
window.updateProjectStatusInline = updateProjectStatusInline;
window.editProject = editProject;
window.handleProjectCodeInput = handleProjectCodeInput;
window.formatCurrencyInputLive = formatCurrencyInputLive;
window.formatCurrencyInputBlur = formatCurrencyInputBlur;
window.executeCmdIndex = executeCmdIndex;
window.recalcFinanceSummary = recalcFinanceSummary;
window.recalcProjectRow = recalcProjectRow;
window.updateProgressBar = updateProgressBar;
window.setMatrixViewMode = setMatrixViewMode;
window.renderExecutiveCharts = renderExecutiveCharts;

/* INSTITUTIONAL AUTHENTICATION & RBAC */
function initAuth() {
  const saved = localStorage.getItem("nbro_auth_session") || sessionStorage.getItem("nbro_auth_session");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.user && parsed.token) {
        state.user = parsed.user;
        state.token = parsed.token;
      }
    } catch (e) {
      console.warn("Auth session parse error:", e);
    }
  }
  updateAuthUI();
  applyRolePermissions();
}

function isUserSystemAdminReal() {
  const u = state.realUser || state.user;
  if (!u) return false;
  const role = String(u.role || "").trim();
  const epf = String(u.epf || "").trim();
  const email = String(u.email || "").toLowerCase();
  return role === "System Admin" || epf === "926" || email.includes("ranjan");
}

function updateAuthUI() {
  const avatar = $("userAvatar");
  const nameLabel = $("userNameLabel");
  const roleBadge = $("userRoleBadge");
  const authTrigger = $("authTriggerBtn");
  const logoutBtn = $("logoutBtn");
  const userMgmtBtn = $("userMgmtBtn");
  const diagSelect = $("diagnosticRoleSelect");
  const diagBanner = $("diagnosticBanner");
  const diagLabel = $("diagnosticTargetLabel");

  const isSysAdmin = isUserSystemAdminReal();
  if (diagSelect) {
    diagSelect.style.display = isSysAdmin ? "inline-block" : "none";
    if (!state.impersonating) diagSelect.value = "";
  }

  if (diagBanner) {
    diagBanner.style.display = state.impersonating ? "flex" : "none";
    if (diagLabel && state.user) {
      diagLabel.textContent = `${state.user.title ? state.user.title + " " : ""}${state.user.fullName || state.user.shortName || state.user.email} (${state.user.role || "Viewer"})`;
    }
  }

  if (state.user) {
    const u = state.user;
    const role = u.role || "Viewer";
    if (avatar) avatar.textContent = role === "Admin" ? "🛡️" : (role === "Manager" ? "💼" : (role === "Editor" ? "🔬" : "👤"));
    if (nameLabel) nameLabel.textContent = `${u.title ? u.title + " " : ""}${u.shortName || u.fullName || u.email}`;
    if (roleBadge) {
      roleBadge.textContent = role;
      roleBadge.className = "badge " + (role === "Admin" ? "completed" : (role === "Manager" ? "in-progress" : (role === "Editor" ? "pipeline" : "")));
    }
    if (authTrigger) authTrigger.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-flex";
    if (userMgmtBtn) userMgmtBtn.style.display = (role === "Admin" || isSysAdmin) ? "inline-flex" : "none";
  } else {
    if (avatar) avatar.textContent = "👤";
    if (nameLabel) nameLabel.textContent = "Guest";
    if (roleBadge) {
      roleBadge.textContent = "Viewer";
      roleBadge.className = "badge";
    }
    if (authTrigger) authTrigger.style.display = "inline-flex";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (userMgmtBtn) userMgmtBtn.style.display = isSysAdmin ? "inline-flex" : "none";
  }
}

/* DIAGNOSTIC SIMULATION & ROLE IMPERSONATION */
function handleDiagnosticRoleChange(role) {
  if (!role) {
    exitDiagnosticMode();
    return;
  }
  
  if (!state.realUser) {
    state.realUser = state.user || {
      epf: 926,
      title: "Mr.",
      shortName: "Ranjan",
      fullName: "Ranjan Weerasinghe",
      email: "ranjan.weerasinghe@gmail.com",
      position: "Scientist",
      workingGroup: "Leader",
      role: "Admin"
    };
  }
  
  state.impersonating = true;
  
  if (role === "System Admin") {
    state.user = { ...state.realUser, role: "Admin", shortName: "Ranjan (SysAdmin)" };
  } else if (role === "Director") {
    state.user = {
      epf: 919,
      title: "Dr.",
      shortName: "Sanchitha",
      fullName: "Sanchitha Jayakody",
      email: "director@nbro.gov.lk",
      position: "Director",
      workingGroup: "Leader",
      role: "Admin"
    };
  } else if (role === "Manager") {
    state.user = {
      epf: 784,
      title: "Mr.",
      shortName: "Suranga",
      fullName: "Suranga Dissanayaka",
      email: "suranga@nbro.gov.lk",
      position: "Senior Scientist",
      workingGroup: "Leader",
      role: "Manager"
    };
  } else if (role === "Editor") {
    state.user = {
      epf: 1089,
      title: "Mrs.",
      shortName: "Gayathri",
      fullName: "D.G.G.K.Somarathna",
      email: "gayathri@nbro.gov.lk",
      position: "Scientist",
      workingGroup: "Member",
      role: "Editor"
    };
  } else if (role === "Viewer") {
    state.user = {
      epf: 1043,
      title: "Miss.",
      shortName: "Rajapaksha",
      fullName: "G.N.D. Rajapaksha",
      email: "viewer@nbro.gov.lk",
      position: "Junior Manager",
      workingGroup: "",
      role: "Viewer"
    };
  }
  
  updateAuthUI();
  applyRolePermissions();
  renderAll();
  showToast(`🎭 Diagnostic Mode: Simulating ${state.user.role} (${state.user.shortName})`);
}

function startDiagnosticSimulation(identifier) {
  const raw = String(identifier || "").trim().toLowerCase();
  const target = (state.knownUsers || []).find(u => {
    const em = String(u.email || "").trim().toLowerCase();
    const epf = String(u.epf || "").trim().toLowerCase();
    return em === raw || epf === raw || epf === `epf-${raw}` || epf.endsWith(raw);
  });
  
  if (!target) {
    showToast("Target user profile not found for simulation.", true);
    return;
  }
  
  if (!state.realUser) {
    state.realUser = state.user || {
      epf: 926,
      title: "Mr.",
      shortName: "Ranjan",
      fullName: "Ranjan Weerasinghe",
      email: "ranjan.weerasinghe@gmail.com",
      position: "Scientist",
      workingGroup: "Leader",
      role: "Admin"
    };
  }
  
  state.impersonating = true;
  state.user = { ...target };
  
  $("userMgmtDialog")?.close();
  updateAuthUI();
  applyRolePermissions();
  renderAll();
  showToast(`🎭 Diagnostic Mode: Simulating ${target.title ? target.title + ' ' : ''}${target.fullName || target.shortName} (${target.role || 'Viewer'})`);
}

function exitDiagnosticMode() {
  if (state.realUser) {
    state.user = { ...state.realUser };
    state.realUser = null;
  }
  state.impersonating = false;
  const diagSelect = $("diagnosticRoleSelect");
  if (diagSelect) diagSelect.value = "";
  
  updateAuthUI();
  applyRolePermissions();
  renderAll();
  showToast("✓ Exited Diagnostic Simulation. Restored System Admin session.");
}

function applyRolePermissions() {
  const role = state.user ? (state.user.role || "Viewer") : "Viewer";
  const isViewer = role === "Viewer";
  const isSysAdmin = isUserSystemAdmin();
  const isDir = isUserDirector();
  const isAdminAuth = isSysAdmin || isDir || role === "Admin";
  const isManager = role === "Manager" || role === "Division Manager" || role === "Finance Manager" || isAdminAuth;
  const canEditFinancials = isAdminAuth || isManager;

  const m = $("wipMonth")?.value || state.month || "2026-06";
  const locked = isMonthLocked(m);

  // If month is locked and user is NOT Admin/Director, editing is frozen!
  const canEditProjects = !isViewer && (!locked || isAdminAuth);

  // Hide or disable write buttons
  const saveWipBtn = $("saveWipBtn");
  const newProjectBtn = $("newProjectBtn");
  const saveFinanceSummaryBtn = $("saveFinanceSummaryBtn");

  if (saveWipBtn) {
    saveWipBtn.style.display = canEditProjects ? "inline-flex" : "none";
  }
  if (newProjectBtn) {
    newProjectBtn.style.display = canEditProjects ? "inline-flex" : "none";
  }
  if (saveFinanceSummaryBtn) {
    saveFinanceSummaryBtn.style.display = (canEditFinancials && (!locked || isAdminAuth)) ? "inline-flex" : "none";
  }

  const adminTabBtn = $("adminTabBtn");
  if (adminTabBtn) {
    adminTabBtn.style.display = isSysAdmin ? "inline-flex" : "none";
  }
  // If user is currently on admin tab but has no permission, redirect
  const activeAdminTab = document.querySelector(".tab[data-view='admin']");
  if (!isSysAdmin && activeAdminTab && activeAdminTab.classList.contains("active")) {
    switchTab("dashboard");
  }

  // Row save buttons in Action column
  document.querySelectorAll(".btn-save-row").forEach(el => {
    el.style.display = canEditProjects ? "inline-flex" : "none";
  });

  // Disable/Enable matrix inputs (Viewer or Locked cannot edit)
  document.querySelectorAll("[data-wip-wp], [data-wip-p], [data-wip-adv], [data-wip-r]").forEach(el => {
    el.disabled = !canEditProjects;
    el.style.opacity = canEditProjects ? "1" : "0.75";
    el.style.cursor = canEditProjects ? "text" : "not-allowed";
    if (locked && !isAdminAuth) {
      el.title = `Month ${m} is finalized & locked. Click 'Request Unlock to Edit' above to request edit access.`;
    } else if (!canEditProjects) {
      el.title = "View-only mode. Please Sign In to edit & save progress.";
    } else {
      el.title = "";
    }
  });

  // Division monthly summary inputs (Restricted to Admin & Manager only)
  ["summaryExp", "summarySubcontract", "summaryMr", "summaryOut", "summaryInter"].forEach(id => {
    const el = $(id);
    if (el) {
      el.disabled = !canEditFinancials || (locked && !isAdminAuth);
      el.style.opacity = (canEditFinancials && (!locked || isAdminAuth)) ? "1" : "0.85";
      el.title = canEditFinancials ? (locked && !isAdminAuth ? "Finalized month" : "") : "Editing division financials is restricted to Admin and Manager accounts";
    }
  });

  renderMonthLockBanner();
}

/* =========================================================================
   MONTHLY GOVERNANCE, APPROVALS & LOCKING SYSTEM
   ========================================================================= */

function initGovernanceData() {
  if (!state.monthGovernance) {
    try {
      const saved = localStorage.getItem("nbro_month_governance");
      state.monthGovernance = saved ? JSON.parse(saved) : {};
    } catch(e) { state.monthGovernance = {}; }
  }
  if (!state.unlockRequests) {
    try {
      const savedReqs = localStorage.getItem("nbro_unlock_requests");
      state.unlockRequests = savedReqs ? JSON.parse(savedReqs) : [];
    } catch(e) { state.unlockRequests = []; }
  }
}

function saveGovernanceData() {
  try {
    localStorage.setItem("nbro_month_governance", JSON.stringify(state.monthGovernance));
    localStorage.setItem("nbro_unlock_requests", JSON.stringify(state.unlockRequests));
  } catch(e) {}
}

function isUserSystemAdmin() {
  if (!state.user) return false;
  const role = String(state.user.role || "").trim();
  const epf = String(state.user.epf || "").trim();
  const email = String(state.user.email || "").toLowerCase();
  return role === "System Admin" || epf === "926" || email.includes("ranjan");
}

function isUserDirector() {
  if (!state.user) return false;
  const pos = String(state.user.position || "").toLowerCase();
  const epf = String(state.user.epf || "").trim();
  const short = String(state.user.shortName || "").toLowerCase();
  return pos.includes("director") || epf === "919" || short.includes("sanchitha");
}

function isUserAdminAuthority() {
  return isUserSystemAdmin() || isUserDirector() || (state.user && state.user.role === "Admin");
}

function getMonthLockInfo(m) {
  initGovernanceData();
  const month = m || state.month || "2026-06";
  
  // 1. Check if central finance summary from Google Sheets has explicit lock status
  const foundFin = (state.financeSummary || []).find(f => reportingMonth(f) === month);
  if (foundFin) {
    const lk = String(foundFin["Lock Status"] || foundFin.lockStatus || "").trim();
    if (lk === "Locked") {
      return {
        status: "Locked",
        finalizedBy: foundFin["Finalized By"] || foundFin.finalizedBy || "Director (Finalized)",
        finalizedAt: foundFin["Finalized At"] || foundFin.finalizedAt || ""
      };
    } else if (lk === "Open" || lk === "Unlocked") {
      return {
        status: "Open",
        finalizedBy: "",
        finalizedAt: ""
      };
    }
  }

  // 2. Check local governance override
  if (state.monthGovernance && state.monthGovernance[month]) {
    return state.monthGovernance[month];
  }

  // 3. Default rules: historical months up to 2026-05 are finalized/locked by default
  const isHistorical = month <= "2026-05";
  return {
    status: isHistorical ? "Locked" : "Open",
    finalizedBy: isHistorical ? "Director (Finalized)" : "",
    finalizedAt: isHistorical ? "2026-06-01" : ""
  };
}

function isMonthLocked(m) {
  return getMonthLockInfo(m).status === "Locked";
}

function renderMonthLockBanner() {
  const m = $("wipMonth")?.value || state.month || "2026-06";
  const info = getMonthLockInfo(m);
  const isLocked = info.status === "Locked";
  const canAdminister = isUserAdminAuthority();
  const isViewer = !state.user || state.user.role === "Viewer";

  const iconEl = $("wipLockIcon");
  const titleEl = $("wipLockTitle");
  const subEl = $("wipLockSubtitle");
  const toggleBtn = $("toggleMonthLockBtn");
  const reqBtn = $("requestUnlockBtn");
  const banner = $("wipMonthLockBanner");

  if (!banner) return;

  if (isLocked) {
    banner.style.background = "#fef2f2";
    banner.style.borderColor = "#fecaca";
    if (iconEl) iconEl.textContent = "🔒";
    if (titleEl) {
      titleEl.innerHTML = `<span style="color:#991b1b;font-weight:800;">Finalized & Locked Month (${safe(m)})</span>`;
    }
    if (subEl) {
      const byStr = info.finalizedBy ? ` • Approved by ${safe(info.finalizedBy)}` : "";
      const atStr = info.finalizedAt ? ` on ${safe(String(info.finalizedAt).slice(0, 10))}` : "";
      subEl.textContent = `Progress records are frozen against unauthorized modifications${byStr}${atStr}.`;
    }
    if (toggleBtn) {
      toggleBtn.style.display = canAdminister ? "inline-flex" : "none";
      toggleBtn.textContent = "🔓 Unlock Month";
      toggleBtn.className = "ghost";
      toggleBtn.style.borderColor = "#dc2626";
      toggleBtn.style.color = "#dc2626";
      toggleBtn.style.background = "#fff";
    }
    if (reqBtn) {
      reqBtn.style.display = (!canAdminister && !isViewer) ? "inline-flex" : "none";
    }
  } else {
    banner.style.background = "var(--bg-surface-subtle)";
    banner.style.borderColor = "var(--border-color)";
    if (iconEl) iconEl.textContent = "🟢";
    if (titleEl) {
      titleEl.innerHTML = `<span style="color:var(--text-primary);font-weight:800;">Open for Monthly Progress Entry (${safe(m)})</span>`;
    }
    if (subEl) {
      subEl.textContent = "Scientists & Engineers can enter and save physical and financial progress for this reporting month.";
    }
    if (toggleBtn) {
      toggleBtn.style.display = canAdminister ? "inline-flex" : "none";
      toggleBtn.textContent = "🔒 Finalize & Lock Month";
      toggleBtn.className = "primary";
      toggleBtn.style.borderColor = "";
      toggleBtn.style.color = "";
      toggleBtn.style.background = "";
    }
    if (reqBtn) {
      reqBtn.style.display = "none";
    }
  }
  updateApprovalBadge();
}

function toggleCurrentMonthLock() {
  if (!isUserAdminAuthority()) {
    showToast("Action restricted to Director and System Admin.", true);
    return;
  }
  const m = $("wipMonth")?.value || state.month || "2026-06";
  toggleMonthLock(m);
}

function toggleMonthLock(m) {
  initGovernanceData();
  const info = getMonthLockInfo(m);
  const willLock = info.status !== "Locked";
  const userLabel = isUserDirector() ? "Dr. Sanchitha (Director)" : getCurrentUserDisplayName();
  const nowIso = new Date().toISOString();
  const newStatus = willLock ? "Locked" : "Open";

  // 1. Update local state
  state.monthGovernance[m] = {
    status: newStatus,
    finalizedBy: willLock ? userLabel : "",
    finalizedAt: willLock ? nowIso : "",
    unlockedBy: !willLock ? userLabel : "",
    unlockedAt: !willLock ? nowIso : ""
  };

  // 2. Update central finance summary row
  const finIdx = (state.financeSummary || []).findIndex(f => reportingMonth(f) === m);
  if (finIdx >= 0) {
    state.financeSummary[finIdx]["Lock Status"] = newStatus;
    state.financeSummary[finIdx]["Finalized By"] = willLock ? userLabel : "";
    state.financeSummary[finIdx]["Finalized At"] = willLock ? nowIso : "";
  }

  saveGovernanceData();
  renderMonthLockBanner();
  applyRolePermissions();
  if ($("governanceDialog")?.open) renderGovernanceModal();

  logSystemAction(willLock ? "MONTH_LOCKED" : "MONTH_UNLOCKED", m, willLock ? `Month ${m} finalized & locked` : `Month ${m} reopened for editing`);
  showToast(willLock ? `🔒 ${m} has been finalized and locked across all devices!` : `🟢 ${m} is now open for progress editing.`);

  // 3. Real-time background sync to Central Google Sheet
  apiPost("toggleMonthLock", {
    reportingMonth: m,
    lockStatus: newStatus,
    finalizedBy: willLock ? userLabel : "",
    finalizedAt: willLock ? nowIso : ""
  }).catch(err => console.warn("Google Sheet lock sync warning:", err));
}

function updateApprovalBadge() {
  initGovernanceData();
  const pending = (state.unlockRequests || []).filter(r => r.status === "Pending").length;
  const badge1 = $("approvalBadge");
  const badge2 = $("govModalBadge");
  const appBtn = $("approvalCenterBtn");

  if (appBtn) {
    appBtn.style.display = isUserAdminAuthority() ? "inline-flex" : "none";
  }
  if (badge1) {
    badge1.style.display = pending > 0 ? "inline-block" : "none";
    badge1.textContent = pending;
  }
  if (badge2) {
    badge2.style.display = pending > 0 ? "inline-block" : "none";
    badge2.textContent = pending;
  }
}

function openGovernanceCenter() {
  if (!isUserAdminAuthority()) {
    showToast("Governance Center is restricted to Director and System Admin.", true);
    return;
  }
  $("governanceDialog")?.showModal();
  renderGovernanceModal();
}

function switchGovTab(tab) {
  $("govTabMonthsBtn")?.classList.toggle("active", tab === "months");
  $("govTabRequestsBtn")?.classList.toggle("active", tab === "requests");
  if ($("govSectionMonths")) $("govSectionMonths").style.display = tab === "months" ? "block" : "none";
  if ($("govSectionRequests")) $("govSectionRequests").style.display = tab === "requests" ? "block" : "none";
  renderGovernanceModal();
}

function renderGovernanceModal() {
  initGovernanceData();
  const monthsContainer = $("govMonthsList");
  const reqsContainer = $("govRequestsList");

  // Render Months list
  if (monthsContainer) {
    const allMonths = ["2026-07", "2026-06", "2026-05", "2026-04", "2026-03", "2026-02", "2026-01"];
    monthsContainer.innerHTML = `
      <div style="border:1px solid var(--border-color);border-radius:6px;overflow:hidden;">
        <table style="width:100%;border-collapse:collapse;font-size:12.5px;">
          <thead>
            <tr style="background:var(--bg-surface-subtle);border-bottom:1px solid var(--border-color);">
              <th style="padding:10px 14px;text-align:left;">Month</th>
              <th style="padding:10px 14px;text-align:left;">Governance Status</th>
              <th style="padding:10px 14px;text-align:left;">Finalized By / Timestamp</th>
              <th style="padding:10px 14px;text-align:center;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${allMonths.map(m => {
              const info = getMonthLockInfo(m);
              const isLocked = info.status === "Locked";
              return `
                <tr style="border-bottom:1px solid var(--border-color-subtle);">
                  <td style="padding:10px 14px;font-weight:700;">${m}</td>
                  <td style="padding:10px 14px;">
                    <span class="badge ${isLocked ? 'danger' : 'in-progress'}" style="font-size:11px;">
                      ${isLocked ? '🔒 Locked' : '🟢 Open for Edits'}
                    </span>
                  </td>
                  <td style="padding:10px 14px;color:var(--text-secondary);font-size:11.5px;">
                    ${isLocked ? `${safe(info.finalizedBy || "Director")}` : "Editable"}
                  </td>
                  <td style="padding:10px 14px;text-align:center;">
                    <button class="${isLocked ? 'ghost' : 'primary'}" style="padding:4px 12px;font-size:11.5px;font-weight:700;" onclick="toggleMonthLock('${m}')">
                      ${isLocked ? '🔓 Unlock' : '🔒 Lock Month'}
                    </button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  // Render Requests list
  if (reqsContainer) {
    const reqs = state.unlockRequests || [];
    if (!reqs.length) {
      reqsContainer.innerHTML = `<div style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px;">No pending or previous unlock requests.</div>`;
    } else {
      reqsContainer.innerHTML = reqs.map(r => `
        <div style="border:1px solid var(--border-color);border-radius:8px;padding:12px 16px;margin-bottom:10px;background:var(--bg-surface);">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <span style="font-weight:800;font-size:13.5px;color:var(--text-primary);">${safe(r.requestedBy)}</span>
              <span class="badge" style="margin-left:6px;font-size:11px;">${safe(r.month)}</span>
            </div>
            <span class="badge ${r.status === 'Approved' ? 'completed' : (r.status === 'Rejected' ? 'danger' : 'pipeline')}" style="font-size:11px;">
              ${safe(r.status)}
            </span>
          </div>
          <div style="margin:8px 0;font-size:12.5px;color:var(--text-secondary);background:var(--bg-surface-subtle);padding:8px 12px;border-radius:6px;border-left:3px solid var(--primary);">
            <b>Reason:</b> ${safe(r.reason)}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--text-muted);">
            <span>Submitted: ${safe(String(r.requestedAt || "").slice(0, 16).replace("T", " "))}</span>
            ${r.status === 'Pending' ? `
              <div style="display:flex;gap:6px;">
                <button class="primary" style="padding:4px 12px;font-size:11.5px;font-weight:700;" onclick="approveUnlockRequest('${r.id}')">✔ Grant Unlock</button>
                <button class="ghost" style="padding:4px 12px;font-size:11.5px;font-weight:700;color:var(--danger);" onclick="rejectUnlockRequest('${r.id}')">✖ Reject</button>
              </div>
            ` : `<span>Processed by ${safe(r.processedBy || "Admin")}</span>`}
          </div>
        </div>
      `).join("");
    }
  }
}

function openUnlockRequestDialog() {
  const m = $("wipMonth")?.value || state.month || "2026-06";
  if ($("unlockReqMonth")) $("unlockReqMonth").value = m;
  if ($("unlockReqReason")) $("unlockReqReason").value = "";
  $("unlockRequestDialog")?.showModal();
}

function handleUnlockRequestSubmit(e) {
  e.preventDefault();
  initGovernanceData();
  const m = $("unlockReqMonth")?.value || state.month;
  const reason = ($("unlockReqReason")?.value || "").trim();
  const userLabel = getCurrentUserDisplayName();
  const nowIso = new Date().toISOString();

  if (!reason) return;

  const req = {
    id: "req_" + Date.now(),
    month: m,
    requestedBy: userLabel,
    reason: reason,
    status: "Pending",
    requestedAt: nowIso
  };

  state.unlockRequests.unshift(req);
  saveGovernanceData();
  $("unlockRequestDialog")?.close();
  showToast("✓ Edit request submitted to Director / System Admin for review!");
  updateApprovalBadge();

  // Real-time sync to Central Google Sheet UNLOCK_REQUESTS tab
  apiPost("createUnlockRequest", req).catch(err => console.warn("Google Sheet unlock request sync warning:", err));
}

function approveUnlockRequest(reqId) {
  initGovernanceData();
  const req = (state.unlockRequests || []).find(x => x.id === reqId);
  if (!req) return;

  const userLabel = isUserDirector() ? "Dr. Sanchitha (Director)" : getCurrentUserDisplayName();
  const nowIso = new Date().toISOString();

  req.status = "Approved";
  req.processedBy = userLabel;
  req.processedAt = nowIso;

  // Unlock the requested month locally
  state.monthGovernance[req.month] = {
    status: "Open",
    unlockedBy: req.processedBy,
    unlockedAt: req.processedAt
  };

  const finIdx = (state.financeSummary || []).findIndex(f => reportingMonth(f) === req.month);
  if (finIdx >= 0) {
    state.financeSummary[finIdx]["Lock Status"] = "Open";
  }

  saveGovernanceData();
  logSystemAction("UNLOCK_REQ_APPROVED", req.month, `Approved unlock request for ${req.requestedBy || 'Staff'}`);
  showToast(`✓ Request approved! Month ${req.month} is now unlocked across all devices.`);
  renderGovernanceModal();
  renderMonthLockBanner();
  applyRolePermissions();

  // Real-time sync to Central Google Sheet
  apiPost("processUnlockRequest", {
    id: reqId,
    month: req.month,
    status: "Approved",
    processedBy: userLabel,
    processedAt: nowIso
  }).catch(err => console.warn("Google Sheet process request sync warning:", err));
}

function rejectUnlockRequest(reqId) {
  initGovernanceData();
  const req = (state.unlockRequests || []).find(x => x.id === reqId);
  if (!req) return;

  const userLabel = isUserDirector() ? "Dr. Sanchitha (Director)" : getCurrentUserDisplayName();
  const nowIso = new Date().toISOString();

  req.status = "Rejected";
  req.processedBy = userLabel;
  req.processedAt = nowIso;

  saveGovernanceData();
  logSystemAction("UNLOCK_REQ_REJECTED", req.month, `Rejected unlock request from ${req.requestedBy || 'Staff'}`);
  showToast(`Request for ${req.month} has been rejected.`);
  renderGovernanceModal();
  updateApprovalBadge();

  // Real-time sync to Central Google Sheet
  apiPost("processUnlockRequest", {
    id: reqId,
    month: req.month,
    status: "Rejected",
    processedBy: userLabel,
    processedAt: nowIso
  }).catch(err => console.warn("Google Sheet process request sync warning:", err));
}

function openAuthDialog(mode = "login") {
  switchAuthTab(mode);
  $("authDialog")?.showModal();
}

function switchAuthTab(mode) {
  const isLogin = mode === "login";
  $("authTabLogin")?.classList.toggle("active", isLogin);
  $("authTabSignup")?.classList.toggle("active", !isLogin);
  if ($("loginForm")) $("loginForm").style.display = isLogin ? "block" : "none";
  if ($("signupForm")) $("signupForm").style.display = !isLogin ? "block" : "none";
  if ($("authModalTitle")) $("authModalTitle").textContent = isLogin ? "🔑 Staff Sign In" : "📝 Staff Account Registration";
  if ($("loginError")) $("loginError").style.display = "none";
  if ($("signupError")) $("signupError").style.display = "none";
}

function handleLoginIdentifierInput(val) {
  const raw = (val || "").trim().toLowerCase();
  const card = $("staffRecognizedCard");
  const nameEl = $("staffRecogName");
  const posEl = $("staffRecogPos");
  const errEl = $("loginError");
  if (!raw || !card) {
    if (card) card.style.display = "none";
    if (errEl) errEl.style.display = "none";
    return;
  }

  const found = (state.knownUsers || []).find(u => {
    const em = String(u.email || "").trim().toLowerCase();
    const epf = String(u.epf || "").trim().toLowerCase();
    return em === raw || epf === raw || epf === `epf-${raw}` || epf.endsWith(raw);
  });

  if (found) {
    card.style.display = "block";
    const displayName = `${found.title ? found.title + " " : ""}${found.fullName || found.shortName || found.email}`;
    if (nameEl) nameEl.textContent = displayName;
    
    if (found.hasPassword === false) {
      if (posEl) posEl.innerHTML = `<span style="color:#d97706;font-weight:600;">⏳ Account not registered with a password yet.</span><br><a href="javascript:void(0)" onclick="quickSwitchToRegister('${safe(found.epf)}')" style="color:var(--primary);font-weight:700;text-decoration:underline;">👉 Click here to register & add password</a>`;
    } else {
      if (posEl) posEl.textContent = `${found.position || "Staff"} • EPF: ${found.epf || "—"}`;
    }
  } else {
    card.style.display = "none";
  }
}

function quickSwitchToRegister(epf) {
  switchAuthTab('signup');
  if ($("regEpf")) {
    $("regEpf").value = epf;
    handleSignupEpfInput(epf);
  }
}

function handleSignupEpfInput(val) {
  const raw = (val || "").trim().toLowerCase();
  const card = $("signupStaffCard");
  const msgEl = $("signupStaffMsg");
  const submitBtn = $("signupSubmitBtn");
  if (!raw) {
    if (card) card.style.display = "none";
    if (submitBtn) submitBtn.disabled = false;
    return;
  }

  const found = (state.knownUsers || []).find(u => {
    const epf = String(u.epf || "").trim().toLowerCase();
    return epf === raw || epf === `epf-${raw}` || epf.endsWith(raw);
  });

  if (found) {
    if (card) card.style.display = "block";
    const displayName = `${found.title ? found.title + " " : ""}${found.fullName || found.shortName}`;
    
    if (found.hasPassword === true) {
      // Account is already registered and has a password
      if (msgEl) msgEl.innerHTML = `<span style="color:var(--danger);font-weight:700;">⚠️ This account is already registered!</span><br><b>${safe(displayName)}</b> (EPF: ${safe(found.epf)}) already has an active password.<br><a href="javascript:void(0)" onclick="switchAuthTab('login')" style="color:var(--primary);font-weight:700;text-decoration:underline;">👉 Click to Log In</a>, or ask an Administrator to reset your password.`;
      if (card) {
        card.style.background = "#fee2e2";
        card.style.borderColor = "#fca5a5";
        card.style.color = "#991b1b";
      }
      if (submitBtn) submitBtn.disabled = true;
    } else {
      // Unregistered pre-loaded profile ready for initial password setup
      if (msgEl) msgEl.innerHTML = `<b>Pre-registered profile found!</b> Auto-filled details for <b>${safe(displayName)}</b>. Please enter your email and password below to activate.`;
      if (card) {
        card.style.background = "var(--primary-subtle)";
        card.style.borderColor = "var(--primary)";
        card.style.color = "var(--primary-text)";
      }
      if (submitBtn) submitBtn.disabled = false;
    }
    
    if (found.fullName && $("regFullName")) $("regFullName").value = found.fullName;
    else if (found.shortName && $("regFullName")) $("regFullName").value = found.shortName;

    if (found.title && $("regTitle")) {
      const tNorm = found.title.trim();
      for (const opt of $("regTitle").options) {
        if (opt.value.toLowerCase().startsWith(tNorm.toLowerCase().replace(".", ""))) {
          $("regTitle").value = opt.value;
          break;
        }
      }
    }

    if (found.position && $("regPosition")) {
      const pNorm = found.position.trim().toLowerCase();
      for (const opt of $("regPosition").options) {
        if (opt.value.toLowerCase() === pNorm || opt.value.toLowerCase().includes(pNorm) || pNorm.includes(opt.value.toLowerCase())) {
          $("regPosition").value = opt.value;
          break;
        }
      }
    }

    if (found.email && $("regEmail") && !$("regEmail").value) {
      $("regEmail").value = found.email;
    }
  } else {
    if (card) card.style.display = "none";
    if (submitBtn) submitBtn.disabled = false;
  }
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const email = $("loginEmail")?.value.trim();
  const password = $("loginPass")?.value;
  const remember = $("loginRemember")?.checked;
  const btn = $("loginSubmitBtn");
  const errEl = $("loginError");

  if (!email || !password) return;
  if (errEl) errEl.style.display = "none";
  if (btn) { btn.disabled = true; btn.textContent = "Verifying credentials…"; }

  try {
    const res = await apiPost("login", { email, password });
    if (res.ok && res.user && res.token) {
      state.user = res.user;
      state.token = res.token;
      if (remember) {
        localStorage.setItem("nbro_auth_session", JSON.stringify({ user: res.user, token: res.token }));
      } else {
        sessionStorage.setItem("nbro_auth_session", JSON.stringify({ user: res.user, token: res.token }));
      }
      fetchKnownUsers();
      $("authDialog")?.close();
      updateAuthUI();
      applyRolePermissions();
      renderAll();
      logSystemAction("LOGIN", res.user.epf ? `EPF ${res.user.epf}` : res.user.email, `User signed in as ${res.user.role || 'Viewer'}`);
      showToast(`Welcome, ${res.user.title || ""} ${res.user.shortName || res.user.fullName}!`);
    } else {
      if (errEl) {
        if (res.needsRegistration) {
          errEl.innerHTML = `⚠️ <b>Password not set yet.</b><br>${safe(res.error)}<br><button type="button" onclick="quickSwitchToRegister('${safe(res.epf || email)}')" class="primary" style="margin-top:10px;padding:6px 14px;font-size:12px;font-weight:700;">👉 Click here to Set Your Password & Activate Account</button>`;
        } else {
          errEl.textContent = res.error || "Login failed. Please check your credentials.";
        }
        errEl.style.display = "block";
      }
    }
  } catch (err) {
    if (errEl) {
      errEl.textContent = "Error: " + err.message;
      errEl.style.display = "block";
    }
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = "🔑 Log In to Dashboard"; }
  }
}

async function handleSignupSubmit(e) {
  e.preventDefault();
  const title = $("regTitle")?.value || "Eng.";
  const fullName = $("regFullName")?.value.trim();
  const epf = $("regEpf")?.value.trim();
  const position = $("regPosition")?.value || "Scientist";
  const email = $("regEmail")?.value.trim();
  const pass = $("regPass")?.value;
  const confirm = $("regPassConfirm")?.value;
  const btn = $("signupSubmitBtn");
  const errEl = $("signupError");

  if (pass !== confirm) {
    if (errEl) {
      errEl.textContent = "Passwords do not match. Please re-enter.";
      errEl.style.display = "block";
    }
    return;
  }

  // Auto-derive shortName from full name
  const shortName = fullName.split(" ")[0] || fullName;

  if (errEl) errEl.style.display = "none";
  if (btn) { btn.disabled = true; btn.textContent = "Registering staff account…"; }

  try {
    const payload = { title, shortName, fullName, epf, position, email, workingGroup: "GED", password: pass };
    const res = await apiPost("signup", payload);
    if (res.ok) {
      if (res.user && res.token) {
        state.user = res.user;
        state.token = res.token;
        localStorage.setItem("nbro_auth_session", JSON.stringify({ user: res.user, token: res.token }));
        updateAuthUI();
        applyRolePermissions();
        renderAll();
      }
      fetchKnownUsers();
      $("authDialog")?.close();
      showToast("Institutional account registered successfully!");
      alert("Registration successful!\n\nYour account has been registered in the NBRI Division Database.");
    } else {
      if (errEl) {
        errEl.textContent = res.error || "Registration could not be completed.";
        errEl.style.display = "block";
      }
    }
  } catch (err) {
    if (errEl) {
      errEl.textContent = "Error: " + err.message;
      errEl.style.display = "block";
    }
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = "📝 Create Institutional Account"; }
  }
}

function logout() {
  if (confirm("Are you sure you want to sign out?")) {
    const prevUser = state.user;
    state.user = null;
    state.token = null;
    localStorage.removeItem("nbro_auth_session");
    sessionStorage.removeItem("nbro_auth_session");
    updateAuthUI();
    applyRolePermissions();
    renderAll();
    if (prevUser) {
      logSystemAction("LOGOUT", prevUser.epf ? `EPF ${prevUser.epf}` : prevUser.email, "User signed out");
    }
    showToast("Signed out successfully.");
  }
}

async function openUserManagement() {
  $("userMgmtDialog")?.showModal();
  await loadUsersList();
}

async function loadUsersList() {
  const tbody = $("usersTableBody");
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:18px;color:var(--text-muted);">Loading staff directory & access permissions…</td></tr>`;

  try {
    const res = await apiGet("getUsers");
    const users = Array.isArray(res.users) ? res.users.slice().sort(compareStaffByHierarchy) : [];
    state.knownUsers = users;
    if ($("userCountBadge")) $("userCountBadge").textContent = `${users.length} Staff Accounts`;

    if (!users.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:18px;color:var(--text-muted);">No staff accounts found in directory.</td></tr>`;
      return;
    }

    tbody.innerHTML = users.map((u, i) => {
      const currentWg = String(u.workingGroup || "").trim();
      return `
      <tr style="border-bottom:1px solid var(--border-color-subtle);">
        <td style="padding:8px 12px;">
          <div style="font-weight:700;color:var(--text-primary);font-size:12.5px;">${safe(u.title || "")} ${safe(u.fullName || u.shortName)}</div>
          <div style="font-size:11px;color:var(--text-secondary);margin-top:1px;">${safe(u.position || "Staff")}</div>
          <div style="font-size:10px;margin-top:3px;">
            ${u.hasPassword ? '<span class="badge completed" style="font-size:9.5px;padding:1px 6px;">✅ Active PW</span>' : '<span class="badge pipeline" style="font-size:9.5px;padding:1px 6px;color:#d97706;border-color:#fcd34d;">⏳ Awaiting PW</span>'}
          </div>
        </td>
        <td style="padding:8px 10px;font-size:12px;">
          <b>EPF: ${safe(u.epf || "—")}</b>
          <div style="font-size:11px;color:var(--text-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${safe(u.email || '')}">${safe(u.email || "No email")}</div>
        </td>
        <td style="padding:8px 6px;">
          <select id="userWgSelect_${i}" style="width:100%;padding:4px 6px;font-size:11.5px;font-weight:600;border-radius:4px;border:1px solid var(--border-color);background:var(--bg-surface);color:var(--text-primary);">
            <option value="Leader" ${currentWg.toLowerCase() === "leader" ? "selected" : ""}>👔 Leader</option>
            <option value="Member" ${currentWg.toLowerCase() === "member" ? "selected" : ""}>🔬 Member</option>
            <option value="Support" ${currentWg.toLowerCase() === "support" || (!currentWg.toLowerCase().includes("leader") && !currentWg.toLowerCase().includes("member")) ? "selected" : ""}>🛠️ Support</option>
          </select>
        </td>
        <td style="padding:8px 6px;">
          <select id="userRoleSelect_${i}" style="width:100%;padding:4px 6px;font-size:11.5px;font-weight:600;border-radius:4px;border:1px solid var(--border-color);background:var(--bg-surface);color:var(--text-primary);">
            <option value="Admin" ${u.role === "Admin" ? "selected" : ""}>🛡️ Admin</option>
            <option value="Manager" ${u.role === "Manager" || u.role === "Division Manager" || u.role === "Finance Manager" ? "selected" : ""}>💼 Manager</option>
            <option value="Editor" ${u.role === "Editor" ? "selected" : ""}>🔬 Editor</option>
            <option value="Viewer" ${u.role === "Viewer" ? "selected" : ""}>👁️ Viewer</option>
          </select>
        </td>
        <td style="padding:8px 6px;">
          <select id="userStatusSelect_${i}" style="width:100%;padding:4px 6px;font-size:11.5px;font-weight:600;border-radius:4px;border:1px solid var(--border-color);background:var(--bg-surface);color:var(--text-primary);">
            <option value="Active" ${u.status === "Active" ? "selected" : ""}>✅ Active</option>
            <option value="Pending" ${u.status === "Pending" ? "selected" : ""}>⏳ Pending</option>
            <option value="Disabled" ${u.status === "Disabled" ? "selected" : ""}>⛔ Disabled</option>
          </select>
        </td>
        <td style="padding:8px 6px;text-align:center;">
          <div style="display:inline-flex;gap:4px;align-items:center;">
            <button class="primary" style="padding:4px 7px;font-size:11px;font-weight:700;" onclick="saveUserPermissions('${safe(u.email || u.epf)}', ${i}, '${safe(u.epf || '')}')" title="Save changes">💾 Save</button>
            <button class="ghost" style="padding:4px 6px;font-size:11px;color:#d97706;border-color:#fcd34d;" onclick="startDiagnosticSimulation('${safe(u.epf || u.email)}')" title="Simulate UI as this user">👁️ Test As</button>
            <button class="ghost" style="padding:4px 5px;font-size:11px;color:var(--danger);border-color:#fca5a5;" onclick="adminResetUserPassword('${safe(u.epf || '')}', '${safe(u.email || '')}', '${safe((u.title ? u.title + ' ' : '') + (u.fullName || u.shortName || ''))}')" title="Reset password">🔑</button>
          </div>
        </td>
      </tr>
    `;
    }).join("");
  } catch (err) {
    console.error(err);
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:18px;color:var(--danger);">Failed to load users: ${err.message}</td></tr>`;
  }
}

async function adminResetUserPassword(epf, email, name) {
  const staffLabel = name || (epf ? `EPF ${epf}` : email);
  const choice = prompt(
    `🔐 Admin Password Reset for: ${staffLabel}\n\n` +
    `• To SET A NEW PASSWORD: Type the new password below and click OK.\n` +
    `• To CLEAR PASSWORD (allow staff member to register fresh): Leave input blank and click OK.\n` +
    `• To cancel: Click Cancel.`,
    ""
  );

  if (choice === null) return; // User clicked Cancel

  const newPassword = choice.trim();
  const isClearing = !newPassword;

  try {
    showToast(isClearing ? `Clearing password for ${staffLabel}…` : `Setting new password for ${staffLabel}…`);
    const res = await apiPost("adminResetPassword", {
      epf: String(epf || "").trim(),
      email: String(email || "").trim(),
      newPassword: newPassword
    });

    if (res.ok) {
      showToast(isClearing ? `✓ Password cleared for ${staffLabel}. Staff member can now register fresh!` : `✓ Password for ${staffLabel} updated successfully!`);
      await loadUsersList();
    } else {
      showToast("Reset failed: " + (res.error || res.message || "Unknown error"), true);
    }
  } catch (err) {
    showToast("Error resetting password: " + err.message, true);
  }
}

async function saveUserPermissions(identifier, idx, epf) {
  const role = $(`userRoleSelect_${idx}`)?.value;
  const status = $(`userStatusSelect_${idx}`)?.value;
  const workingGroup = $(`userWgSelect_${idx}`)?.value;
  if (!identifier || !role || !status) return;

  try {
    const userLabel = getCurrentUserDisplayName();
    showToast(`Updating profile & working group for ${identifier}…`);
    const res = await apiPost("updateUserRole", { email: identifier, epf, role, status, workingGroup, updatedBy: userLabel });
    if (res.ok) {
      showToast(`✓ Profile & Working Group status updated!`);
      // Update local state
      const u = state.knownUsers.find(x => String(x.email || "").toLowerCase() === identifier.toLowerCase() || String(x.epf || "") === String(epf));
      if (u) {
        u.role = role;
        u.status = status;
        u.workingGroup = workingGroup;
        u.updatedBy = userLabel;
        u.updatedAt = new Date().toISOString();
      }
      fillFilters();
      renderAll();
    } else {
      showToast("Update failed: " + res.error, true);
    }
  } catch (err) {
    showToast("Error: " + err.message, true);
  }
}

async function fetchKnownUsers() {
  try {
    const res = await apiGet("getUsers");
    if (Array.isArray(res.users)) {
      state.knownUsers = res.users;
      localStorage.setItem("nbro_known_users", JSON.stringify(res.users));
    }
  } catch (e) {
    const cached = localStorage.getItem("nbro_known_users");
    if (cached) {
      try { state.knownUsers = JSON.parse(cached) || []; } catch(err){}
    }
  }
}

/* =========================================================================
   SYSTEM ADMIN ANALYTICS, USER STATISTICS & OPERATIONAL TELEMETRY
   ========================================================================= */

function initSystemLogs() {
  if (!Array.isArray(state.logs)) {
    try {
      const saved = localStorage.getItem("nbri_system_logs");
      state.logs = saved ? JSON.parse(saved) : [];
    } catch(e) { state.logs = []; }
  }
}

function logSystemAction(action, target, details) {
  initSystemLogs();
  const now = new Date();
  const uName = getCurrentUserDisplayName();
  const logEntry = {
    id: "log_" + now.getTime(),
    timestamp: now.toISOString(),
    user: uName,
    action: action || "GENERAL",
    target: target || "—",
    details: details || ""
  };

  state.logs.unshift(logEntry);
  // Keep clean compact buffer of latest 150 entries
  if (state.logs.length > 150) state.logs = state.logs.slice(0, 150);

  try {
    localStorage.setItem("nbri_system_logs", JSON.stringify(state.logs));
  } catch(e) {}

  // Background sync to Google Sheets
  apiPost("logAction", logEntry).catch(() => {});

  // Update UI if viewing admin tab
  const curAdminTab = document.querySelector(".tab[data-view='admin']");
  if (curAdminTab && curAdminTab.classList.contains("active")) {
    renderAdminLogsTable($("adminLogSearchInput")?.value || "");
    const countBadge = $("adminLogsCountBadge");
    if (countBadge) countBadge.textContent = `${state.logs.length} Logs`;
  }
}
window.logSystemAction = logSystemAction;

function clearLocalLogs() {
  if (!isUserSystemAdmin()) {
    showToast("Access restricted to System Admin.", true);
    return;
  }
  if (!confirm("Are you sure you want to clear the local activity log buffer? (Recent events in Google Sheets remain intact)")) return;
  state.logs = [];
  try { localStorage.removeItem("nbri_system_logs"); } catch(e){}
  renderAdminLogsTable("");
  if ($("adminLogsCountBadge")) $("adminLogsCountBadge").textContent = "0 Logs";
  showToast("✓ Local log buffer cleared.");
}
window.clearLocalLogs = clearLocalLogs;

function renderAdminDashboard() {
  if (!isUserSystemAdmin()) {
    showToast("Access restricted: System Admin only.", true);
    switchTab("dashboard");
    return;
  }
  initSystemLogs();

  const totalProjects = (state.projects || []).length;
  const activeProjects = (state.projects || []).filter(p => status(p) !== "Completed").length;
  const completedProjects = totalProjects - activeProjects;

  const totalWipEntries = (state.wip || []).length;
  const uniqueWipMonths = [...new Set((state.wip || []).map(r => reportingMonth(r)).filter(Boolean))];

  const allUsers = state.knownUsers || [];
  const activeUsersCount = allUsers.filter(u => u.status !== "Disabled").length;

  const lockedMonthsList = (state.financeSummary || [])
    .filter(f => isMonthLocked(reportingMonth(f)))
    .map(f => reportingMonth(f));

  // 1. Render Top Telemetry Cards
  if ($("adminTelemetryKpis")) {
    $("adminTelemetryKpis").innerHTML = `
      <div class="card">
        <div class="title">📁 Registered Projects</div>
        <div class="value" style="color:var(--primary);">${totalProjects}</div>
        <div class="sub">${activeProjects} Active · ${completedProjects} Completed</div>
      </div>
      <div class="card">
        <div class="title">📈 Monthly Progress Records</div>
        <div class="value" style="color:#2563eb;">${totalWipEntries}</div>
        <div class="sub">Across ${uniqueWipMonths.length} Reporting Months</div>
      </div>
      <div class="card">
        <div class="title">👥 Staff Directory</div>
        <div class="value" style="color:#059669;">${allUsers.length}</div>
        <div class="sub">${activeUsersCount} Active Accounts</div>
      </div>
      <div class="card">
        <div class="title">🔒 Finalized Months</div>
        <div class="value" style="color:#d97706;">${lockedMonthsList.length}</div>
        <div class="sub">${lockedMonthsList.join(", ") || "All Months Open"}</div>
      </div>
      <div class="card">
        <div class="title">⚡ System Storage Health</div>
        <div class="value" style="color:#10b981;font-size:18px;">Operational</div>
        <div class="sub">Sync with Central Sheets Active</div>
      </div>
    `;
  }

  // 2. Render Staff Statistics Table
  if ($("adminStaffStatsTbody")) {
    if ($("adminStaffCountBadge")) $("adminStaffCountBadge").textContent = `${allUsers.length} Staff Accounts`;

    const userStats = allUsers.map(u => {
      const sName = u.shortName || (u.fullName ? u.fullName.split(" ")[0] : u.email);
      const sLower = sName.toLowerCase();
      const projCount = (state.projects || []).filter(p => {
        const sc = scientist(p).toLowerCase();
        const wg = String(p["Working Group"] || "").toLowerCase();
        return sc.includes(sLower) || wg.includes(sLower);
      }).length;
      return { u, sName, projCount };
    });

    // Sort by most projects assigned
    userStats.sort((a, b) => b.projCount - a.projCount);

    $("adminStaffStatsTbody").innerHTML = userStats.map(item => {
      const u = item.u;
      const rankIcon = getStaffRankIcon(u);
      const roleBadge = u.role === "Admin" ? "completed" : (u.role === "Manager" ? "in-progress" : "pipeline");
      const lastLoginStr = u.lastLogin ? String(u.lastLogin).slice(0, 10) : "Never";
      return `
        <tr style="border-bottom:1px solid var(--border-color-subtle);">
          <td style="padding:8px 10px;">
            <div style="font-weight:700;color:var(--text-primary);">${rankIcon} ${safe(u.title ? u.title + ' ' : '')}${safe(u.fullName || u.shortName)}</div>
            <div style="font-size:10.5px;color:var(--text-muted);">${safe(u.position || "Staff")} · EPF: ${safe(u.epf || "—")}</div>
          </td>
          <td style="padding:8px 10px;">
            <span class="badge ${roleBadge}" style="font-size:10px;padding:2px 6px;">${safe(u.role || "Viewer")}</span>
            <div style="font-size:10.5px;color:var(--text-secondary);margin-top:2px;">WG: ${safe(u.workingGroup || "—")}</div>
          </td>
          <td style="padding:8px 10px;font-weight:700;color:var(--text-primary);">
            ${item.projCount > 0 ? `<b>${item.projCount}</b> projs` : `<span style="color:var(--text-muted);">0</span>`}
          </td>
          <td style="padding:8px 10px;font-size:11px;color:var(--text-secondary);">
            ${u.lastLogin ? `<span>🕒 ${safe(lastLoginStr)}</span>` : `<span style="color:var(--text-muted);">Never</span>`}
          </td>
        </tr>
      `;
    }).join("");
  }

  // 3. Render Logs Table
  renderAdminLogsTable($("adminLogSearchInput")?.value || "");
}
window.renderAdminDashboard = renderAdminDashboard;

function renderAdminLogsTable(filterQuery = "") {
  initSystemLogs();
  const q = (filterQuery || "").toLowerCase().trim();
  const tbody = $("adminLogsTbody");
  if (!tbody) return;

  const logs = state.logs || [];
  if ($("adminLogsCountBadge")) $("adminLogsCountBadge").textContent = `${logs.length} Logs`;

  const filtered = q
    ? logs.filter(l => `${l.timestamp} ${l.user} ${l.action} ${l.target} ${l.details}`.toLowerCase().includes(q))
    : logs;

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--text-muted);font-size:12px;">No activity logs found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.slice(0, 100).map(l => {
    const timeStr = l.timestamp ? new Date(l.timestamp).toLocaleString("en-GB", { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" }) : "—";
    let actionBadgeClass = "pipeline";
    let actionIcon = "📝";
    if (l.action.includes("LOGIN")) { actionBadgeClass = "completed"; actionIcon = "🔑"; }
    else if (l.action.includes("LOCK")) { actionBadgeClass = "in-progress"; actionIcon = "🔒"; }
    else if (l.action.includes("SAVE")) { actionBadgeClass = "completed"; actionIcon = "💾"; }
    else if (l.action.includes("USER") || l.action.includes("PASSWORD")) { actionBadgeClass = "in-progress"; actionIcon = "👤"; }
    else if (l.action.includes("REJECT")) { actionBadgeClass = "red"; actionIcon = "✕"; }

    return `
      <tr style="border-bottom:1px solid var(--border-color-subtle);">
        <td style="padding:6px 8px;font-size:10.5px;color:var(--text-muted);white-space:nowrap;">
          ${safe(timeStr)}
        </td>
        <td style="padding:6px 8px;font-weight:600;color:var(--text-primary);font-size:11.5px;">
          ${safe(l.user)}
        </td>
        <td style="padding:6px 8px;">
          <span class="badge ${actionBadgeClass}" style="font-size:10px;padding:2px 6px;">${actionIcon} ${safe(l.action)}</span>
        </td>
        <td style="padding:6px 8px;font-size:11.5px;">
          ${l.target && l.target !== '—' ? `<b>${safe(l.target)}</b>: ` : ''}<span style="color:var(--text-secondary);">${safe(l.details)}</span>
        </td>
      </tr>
    `;
  }).join("");
}
window.renderAdminLogsTable = renderAdminLogsTable;

// Auth Event Listeners
if ($("authTriggerBtn")) $("authTriggerBtn").onclick = () => openAuthDialog("login");
if ($("logoutBtn")) $("logoutBtn").onclick = logout;
if ($("userMgmtBtn")) $("userMgmtBtn").onclick = openUserManagement;

window.switchAuthTab = switchAuthTab;
window.handleLoginIdentifierInput = handleLoginIdentifierInput;
window.handleSignupEpfInput = handleSignupEpfInput;
window.quickSwitchToRegister = quickSwitchToRegister;
window.handleLoginSubmit = handleLoginSubmit;
window.handleSignupSubmit = handleSignupSubmit;
window.openAuthDialog = openAuthDialog;
window.logout = logout;
window.openUserManagement = openUserManagement;
window.loadUsersList = loadUsersList;
window.saveUserPermissions = saveUserPermissions;
window.adminResetUserPassword = adminResetUserPassword;
window.handleWipMonthChange = handleWipMonthChange;
window.saveWip = saveWip;
window.exportWipA3Pdf = exportWipA3Pdf;
window.toggleCurrentMonthLock = toggleCurrentMonthLock;
window.toggleMonthLock = toggleMonthLock;
window.openGovernanceCenter = openGovernanceCenter;
window.switchGovTab = switchGovTab;
window.openUnlockRequestDialog = openUnlockRequestDialog;
window.handleUnlockRequestSubmit = handleUnlockRequestSubmit;
window.approveUnlockRequest = approveUnlockRequest;
window.rejectUnlockRequest = rejectUnlockRequest;
window.setDashHorizon = setDashHorizon;
window.setDashFinancialFocus = setDashFinancialFocus;
window.handleDashMonthChange = handleDashMonthChange;
window.renderExecutiveDashboard = renderExecutiveDashboard;
window.handleDiagnosticRoleChange = handleDiagnosticRoleChange;
window.startDiagnosticSimulation = startDiagnosticSimulation;
window.exitDiagnosticMode = exitDiagnosticMode;

// Boot application
initAuth();
init();
