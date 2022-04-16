import Image from 'next/image'
import Link from 'next/link'

import logoImage from '@/assets/images/logo.svg'

export const Logo = () => {
	return (
		<Link href="/">
			<a className="px-layout mb-10 block">
				<Image
					src={logoImage}
					width={247}
					height={34}
					alt="online-cinema"
					draggable={false}
				/>
			</a>
		</Link>
	)
}
