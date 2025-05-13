import { privateRoutes } from './PrivateRoutes';
import { publicRoutes } from './PublicRoutes';

const RootRoutes = [...publicRoutes, ...privateRoutes];

export default RootRoutes;
