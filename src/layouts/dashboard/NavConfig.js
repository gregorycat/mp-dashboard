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
    title: 'publishers',
    path: '/dashboard/partners',
    icon: getIcon('eva:people-fill'),
  }
];

export default navConfig;
