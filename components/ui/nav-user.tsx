"use client"

import * as React from "react"
import { LogIn, LogOut, Settings, User } from "lucide-react"
import { ModeToggle } from "@/components/theme/mode-toggle"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "./button"
import { signOut, useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface NavUserProps {
	user: {
		name: string
		email: string
		image: string
	}
}

export function NavUser({ user }: NavUserProps) {
	const { data: session } = useSession()
	const router = useRouter()
	const { isMobile } = useSidebar()

	return (
		<DropdownMenu>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Image
								src={user.image || "/placeholder.svg"}
								alt={user.name}
								className="size-8 rounded-lg shrink-0"
								width={32}
								height={32}
							/>
							<div className="flex flex-col gap-1 leading-none ml-1 min-w-0">
								<span className="font-semibold">{user.name}</span>
								<span className="truncate">{user.email}</span>
							</div>
						</SidebarMenuButton>
					</DropdownMenuTrigger>
				</SidebarMenuItem>
			</SidebarMenu>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-64"
				align="end"
				side={isMobile ? "bottom" : "right"}
				sideOffset={4}
			>
				<DropdownMenuItem>
					<User className="mr-2 size-4" />
					Profile
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Settings className="mr-2 size-4" />
					Settings
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="flex items-center justify-between focus:bg-inherit"
					onSelect={(e) => {
						e.preventDefault()
					}}
				>
					Theme
					<ModeToggle />
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					{session ? (
						<Button
							variant={"ghost"}
							onClick={async () => {
								await signOut({
									fetchOptions: {
										onSuccess: () => {
											router.push("/")
										},
									},
								})
							}}
						>
							<LogOut className="mr-2 size-4" />
							Log out
						</Button>
					) : (
						<Button variant={"ghost"} asChild>
							<Link href={"/auth/signin"}>
								<LogIn /> Log in
							</Link>
						</Button>
					)}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
