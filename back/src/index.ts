import { PORT } from "./config/env";

import server from "./server";

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

