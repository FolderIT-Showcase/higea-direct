package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.Plan;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlanObraSocialHigea {
    private int plan_os_id;
    private int obra_social_id;
    private String plan_os_nombre;

    public Plan convert() {
        Plan plan = new Plan();
        plan.setId((long) this.plan_os_id);
        plan.setRazon_social(this.plan_os_nombre);
        return plan;
    }
}
