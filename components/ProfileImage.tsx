import Image from 'next/image';

export function ProfileImage() {
  return (
    <Image
      src="/images/profile.jpg"
      alt="Jason Mitchell Profile"
      width={32}
      height={32}
      style={{ borderRadius: '50%' }}
      priority
    />
  );
}
