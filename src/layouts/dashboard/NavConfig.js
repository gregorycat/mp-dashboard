// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'extensions',
    path: '/dashboard/extensions',
    icon: getIcon('eva:cube-fill'),
  },
  {
    title: 'micro-apps',
    path: '/dashboard/micro-apps',
    icon: getIcon('eva:grid-outline'),
  },
  {
    title: 'publishers',
    path: '/dashboard/partners',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'providers',
    path: '/dashboard/providers',
    icon: getIcon('eva:clipboard-outline'),
  }
];

export default navConfig;
