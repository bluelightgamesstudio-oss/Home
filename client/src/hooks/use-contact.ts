import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertMessage } from "@shared/schema";

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
           const error = api.contact.submit.responses[400].parse(await res.json());
           throw new Error(error.message);
        }
        throw new Error("Failed to submit message");
      }
      return api.contact.submit.responses[201].parse(await res.json());
    },
  });
}
