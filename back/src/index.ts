import { PORT } from "./config/env";

import server from "./server";
import "reflect-metadata"
import { AppDataSource } from "./config/data-source";


AppDataSource.initialize()
    .then((res) => {
        console.log("DataSource Initialized");
        
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            });
    })

// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

