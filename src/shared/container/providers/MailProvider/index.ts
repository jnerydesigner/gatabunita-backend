import { container } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IMailProvider>(
  'MailProvider',
  EtherealMailProvider,
);

container.registerSingleton<IStorageProvider>(
  'DiskStorageProvider',
  DiskStorageProvider,
);