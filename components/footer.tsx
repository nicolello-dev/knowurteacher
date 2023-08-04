import Link from "next/link";

export default function Footer() {
	const links = [
		{
			name: "Legal",
			items: [
				{
					name: "Privacy Policy",
					link: "/legal/privacy-policy"
				},
				{
					name: "Terms Of Service",
					link: "/legal/terms-of-service"
				}
			]
		},
		{
			name: "Info",
			items: [
				{
					name: "About",
					link: "/about"
				},
				{
					name: "Extended FAQ",
					link: "/faq"
				}
			]
		},
		{
			name: "Complaints",
			items: [
				{
					name: "Send a complaint",
					link: "/complaints"
				},
				{
					name: "Report",
					link: "/report"
				}
			]
		}
	]
    return (
        <>
            <footer className="p-4 text-center bg-black flex justify-evenly">
				{
					links.map((l, i) => {
						return <div key={i} className="flex flex-col items-center m-3">
							<h1 className="text-lg text-primary text-xl dark:text-darkaccent">
								{
									l.name
								}
							</h1>
							<ul>
								{
									l.items.map((item, i) => {
										return <li key={i}>
											<Link className="dark:text-darktext my-1" href={item.link}>{item.name}</Link>
										</li> 
									})
								}
							</ul>
						</div>
					})
				}
            </footer>
        </>
    )
}