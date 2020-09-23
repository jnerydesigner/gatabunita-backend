import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageAvatar from '@shared/container/providers/StorageProvider/fakes/FakeStorageAvatar';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {
  it('should be able to create a new avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageAvatar = new FakeStorageAvatar();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageAvatar,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@semnome.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to create a new avatar only for autenticated', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageAvatar = new FakeStorageAvatar();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageAvatar,
    );

    expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete and update avatar from user existing', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageAvatar = new FakeStorageAvatar();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageAvatar,
    );

    const deleteFile = jest.spyOn(fakeStorageAvatar, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@semnome.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'new-avatar.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('new-avatar.jpg');
  });
});
