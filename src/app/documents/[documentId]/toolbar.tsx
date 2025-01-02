"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import {
	AlignCenterIcon,
	AlignJustifyIcon,
	AlignLeftIcon,
	AlignRightIcon,
	BaselineIcon,
	BoldIcon,
	ChevronDownIcon,
	CodeIcon,
	HighlighterIcon,
	ImageIcon,
	ItalicIcon,
	Link2Icon,
	ListIcon,
	ListOrderedIcon,
	ListTodoIcon,
	MessageSquarePlusIcon,
	PrinterIcon,
	Redo2Icon,
	RemoveFormatting,
	SearchIcon,
	SpellCheckIcon,
	UnderlineIcon,
	Undo2Icon,
	UploadIcon,
	type LucideIcon
} from "lucide-react";
import { ReactElement, useState, type FC } from "react";
import { CirclePicker, SketchPicker, type ColorResult } from "react-color";

const ListButton = () => {
	const { editor } = useEditorStore();

	const lists = [
		{
			label: "Bullet List",
			icon: ListIcon,
			isActive: () => editor?.isActive("bulletList"),
			onClick: () => editor?.chain().focus().toggleBulletList().run()
		},
		{
			label: "Ordered List",
			icon: ListOrderedIcon,
			isActive: () => editor?.isActive("orderedList"),
			onClick: () => editor?.chain().focus().toggleOrderedList().run()
		}
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-9 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-2 overflow-hidden text-sm">
					<ListIcon className="size-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-0">
				{lists.map(({ label, icon: Icon, onClick, isActive }) => (
					<button
						key={label}
						onClick={onClick}
						className={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
							isActive() && "bg-neutral-200/80"
						)}>
						<Icon className="size-4" />
						<span className="text-sm">{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const AlignButton = () => {
	const { editor } = useEditorStore();

	const alignments = [
		{
			label: "Align Left",
			value: "left",
			icon: AlignLeftIcon
		},
		{
			label: "Align Center",
			value: "center",
			icon: AlignCenterIcon
		},
		{
			label: "Align Right",
			value: "right",
			icon: AlignRightIcon
		},
		{
			label: "Align Justify",
			value: "justify",
			icon: AlignJustifyIcon
		}
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-9 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-2 overflow-hidden text-sm">
					<AlignLeftIcon className={"size-4"} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-0">
				{alignments.map(({ label, value, icon: Icon }) => (
					<button
						key={value}
						onClick={() => {
							editor?.chain().focus().setTextAlign(value).run();
						}}
						className={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
							editor?.isActive("textAlign", { value }) && "bg-neutral-200/80"
						)}>
						<Icon className="size-4" />
						<span className="text-sm">{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const ImageButton = () => {
	const { editor } = useEditorStore();
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [imageUrl, setImageUrl] = useState("");

	const onChange = (src: string) => {
		editor?.chain().focus().setImage({ src }).run();
	};

	const onUpload = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";

		input.onchange = (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (file) {
				const imageUrl = URL.createObjectURL(file);
				onChange(imageUrl);
			}
		};

		input.click();
	};

	const handleImageUrlSubmit = () => {
		if (imageUrl) {
			onChange(imageUrl);
			setImageUrl("");
			setIsDialogOpen(false);
		}
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="h-7 min-w-9 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-2 overflow-hidden text-sm">
						<ImageIcon className={"size-4"} />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={onUpload}>
						<UploadIcon className="mr-2 h-4 w-4" />
						Upload
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
						<SearchIcon className="mr-2 h-4 w-4" />
						Paste image URL
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Paste image URL</DialogTitle>
					</DialogHeader>
					<Input
						placeholder="Insert image URL"
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleImageUrlSubmit()}
					/>
					<DialogFooter>
						<Button onClick={handleImageUrlSubmit}>Insert</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

const LinkButton = () => {
	const { editor } = useEditorStore();
	const [value, setValue] = useState("");

	const onChange = (href: string) => {
		editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
		setValue("");
	};
	return (
		<DropdownMenu onOpenChange={(open) => open && setValue(editor?.getAttributes("link").href || "")}>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-9 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-2 overflow-hidden text-sm">
					<Link2Icon className={"size-4"} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
				<Input placeholder="https://" value={value} onChange={(e) => setValue(e.target.value)} />
				<Button onClick={() => onChange(value)} disabled={!value}>
					Apply
				</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const HighlightColorButton = () => {
	const { editor } = useEditorStore();
	const color = editor?.getAttributes("highlight").color || "#000000";
	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setHighlight({ color: color.hex }).run();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-9 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-2 overflow-hidden text-sm">
					<HighlighterIcon className={"size-4"} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-0 border">
				<SketchPicker onChange={onChange} color={color} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const TextColorButton = () => {
	const { editor } = useEditorStore();
	const value = editor?.getAttributes("textStyle").color || "#000000";

	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setColor(color.hex).run();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-9 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-2 overflow-hidden text-sm">
					<BaselineIcon className="size-4" style={{ color: value }} />
					{/* <div className={'h-0.5 w-full'} style={{ backgroundColor: value }} /> */}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2.5 ">
				<CirclePicker color={value} onChange={onChange} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const HeadingLevelButton = () => {
	const { editor } = useEditorStore();

	const headings = [
		{
			label: "Normal text",
			value: 0,
			fontSize: "16px"
		},
		{
			label: "Heading 1",
			value: 1,
			fontSize: "32px"
		},
		{
			label: "Heading 2",
			value: 2,
			fontSize: "24px"
		},
		{
			label: "Heading 3",
			value: 3,
			fontSize: "20px"
		},
		{
			label: "Heading 4",
			value: 4,
			fontSize: "18px"
		},
		{
			label: "Heading 5",
			value: 5,
			fontSize: "16px"
		}
	];

	const getCurrentHeading = () => {
		for (let level = 1; level <= 5; level++) {
			if (editor?.isActive("heading", { level })) {
				return `Heading ${level}`;
			}
		}
		return "Normal text";
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 w-[130px] shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-2 overflow-hidden text-sm">
					<span className="truncate ">{getCurrentHeading()}</span>
					<ChevronDownIcon className="size-4 ml-2 shrink-0" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{headings.map(({ label, value, fontSize }) => (
					<button
						key={value}
						style={{ fontSize }}
						onClick={() => {
							if (value === 0) {
								editor?.chain().focus().setParagraph().run();
								return;
							} else {
								editor
									?.chain()
									.focus()
									.toggleHeading({ level: value as 1 | 2 | 3 | 4 | 5 })
									.run();
							}
						}}
						className={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
							((value === 0 && !editor?.isActive("heading")) ||
								editor?.isActive("heading", { level: value })) &&
								"bg-neutral-200/80"
						)}>
						{label}
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const FontFamilyButton = () => {
	const { editor } = useEditorStore();
	const font = [
		{
			label: "Arial",
			value: "Arial"
		},
		{
			label: "Arial Black",
			value: "Arial Black"
		},

		{
			label: "Times New Roman",
			value: "Times New Roman"
		},
		{
			label: "Courier New",
			value: "Courier New"
		},
		{
			label: "Verdana",
			value: "Verdana"
		},
		{
			label: "Georgia",
			value: "Georgia"
		},
		{
			label: "Trebuchet MS",
			value: "Trebuchet MS"
		},
		{
			label: "Comic Sans MS",
			value: "Comic Sans MS"
		},
		{
			label: "Impact",
			value: "Impact"
		},
		{
			label: "Helvetica",
			value: "Helvetica"
		}
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-2 overflow-hidden text-sm">
					<span className="truncate">{editor?.getAttributes("textStyle").fontFamily || "Arial"}</span>
					<ChevronDownIcon className="size-4 ml-2 shrink-0" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-x-1">
				{font.map(({ label, value }) => (
					<button
						key={label}
						onClick={() => {
							editor?.chain().focus().setFontFamily(value).run();
						}}
						className={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
							editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
						)}
						style={{ fontFamily: value }}>
						<span className="text-sm">{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

interface ToolbarButtonProps {
	onClick: () => void;
	isActive?: boolean;
	icon: LucideIcon;
}

const ToolbarButton: FC<ToolbarButtonProps> = ({ onClick, isActive, icon: Icon }): ReactElement => {
	return (
		<button
			onClick={onClick}
			className={cn(
				"text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
				isActive && "bg-neutral-200/80"
			)}>
			<Icon className="size-4" />
		</button>
	);
};

const Toolbar = ({}) => {
	const { editor } = useEditorStore();

	const section: { label: string; icon: LucideIcon; onClick: () => void; isActive?: boolean }[][] = [
		[
			{
				label: "Undo",
				icon: Undo2Icon,
				onClick: () => {
					editor?.chain().focus().undo().run();
				}
			},
			{
				label: "Redo",
				icon: Redo2Icon,
				onClick: () => {
					editor?.chain().focus().redo().run();
				}
			},
			{
				label: "Print",
				icon: PrinterIcon,
				onClick: () => {
					window.print();
				}
			},
			{
				label: "Spell Check",
				icon: SpellCheckIcon,
				onClick: () => {
					const current = editor?.view.dom.getAttribute("spellcheck");
					editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
				}
			},
			{
				label: "Code Block",
				icon: CodeIcon,
				onClick: () => {
					editor?.chain().focus().toggleCodeBlock().run();
				}
			}
		],
		[
			{
				label: "Bold",
				icon: BoldIcon,
				isActive: editor?.isActive("bold"),
				onClick: () => {
					editor?.chain().focus().toggleBold().run();
				}
			},
			{
				label: "Italic",
				icon: ItalicIcon,
				isActive: editor?.isActive("italic"),
				onClick: () => {
					editor?.chain().focus().toggleItalic().run();
				}
			},
			{
				label: "Underline",
				icon: UnderlineIcon,
				isActive: editor?.isActive("underline"),
				onClick: () => {
					editor?.chain().focus().toggleUnderline().run();
				}
			}
		],
		[
			{
				label: "Comment",
				icon: MessageSquarePlusIcon,
				onClick: () => {
					// editor?.chain().focus().toggleComment().run();
					console.log("Comment");
				},
				isActive: false //TODO: Enable this functionality
			},
			{
				label: "List Todo",
				icon: ListTodoIcon,
				onClick: () => editor?.chain().focus().toggleTaskList().run(),
				isActive: editor?.isActive("taskList")
			},
			{
				label: "Remove Formatting",
				icon: RemoveFormatting,
				onClick: () => editor?.chain().focus().unsetAllMarks().run(),
				isActive: editor?.isActive("removeFormatting")
			}
		]
	];

	return (
		<div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
			{section[0].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<FontFamilyButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<HeadingLevelButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{/* TODO:Font Size */}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{section[1].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			{/* TODO: Font color */}
			<TextColorButton />
			<HighlightColorButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<LinkButton />
			<ImageButton />
			<AlignButton />
			{/* TODO: Line Height */}
			<ListButton />
			{section[2].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
		</div>
	);
};

export default Toolbar;
