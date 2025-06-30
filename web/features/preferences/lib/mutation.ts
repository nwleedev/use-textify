import { updatePreference } from "@/entities/preferences/lib/api";
import { UpdatePreferenceSchema } from "@/entities/preferences/lib/schema";
import Client from "pocketbase";

export interface UpdatePreferenceMutationProps {
  id: string;
  schema: UpdatePreferenceSchema;
}

export function updatePreferenceMutation(client: Client) {
  return (props: UpdatePreferenceMutationProps) => {
    const { id, schema } = props;
    return updatePreference(client, id, schema);
  };
}
