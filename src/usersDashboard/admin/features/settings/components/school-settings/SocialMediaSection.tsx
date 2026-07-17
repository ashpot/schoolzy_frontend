import { type UseFormRegister } from "react-hook-form";
import { Globe, AtSign, MessageCircle,} from "lucide-react";
import IconInput from "../shared/IconInput";
import type { SchoolSettingsValues } from "../../schemas";

interface Props {
  register: UseFormRegister<SchoolSettingsValues>;
  isPending: boolean;
}

export default function SocialMediaSection({ register, isPending }: Props) {
  return (
    <div className="space-y-4">
      <IconInput
        label="Facebook"
        hint="— page URL"
        placeholder="https://facebook.com/myschool"
        icon={<Globe size={15} className="text-blue-600" />}
        isLoading={isPending}
        {...register("facebook")}
      />
      <IconInput
        label="Twitter / X"
        hint="— profile URL"
        placeholder="https://twitter.com/myschool"
        icon={<AtSign size={15} className="text-sky-500" />}
        isLoading={isPending}
        {...register("twitter")}
      />
      <IconInput
        label="WhatsApp"
        hint="— number or link"
        placeholder="+234 803 456 7890"
        icon={<MessageCircle size={15} className="text-green-500" />}
        isLoading={isPending}
        {...register("whatsapp")}
      />
    </div>
  );
}