// 独立模型 - 每种类型有自己专门的结构
// 基于 Google Sheets 各标签页
import archaeologicalSite from './archaeologicalSite'  // 母系考古/时间线
import goddess from './goddess'                        // 女神谱系（Holly）
import community from './community'                    // 现存氏族（李雯）
import ancientMatriarchalSociety from './ancientMatriarchalSociety'  // 古代母权社会（李雯）
import publication from './publication'                // 相关论著（Pei Pei/艺帆）
import scholar from './scholar'                        // 学者名录（Peipei/艺帆）

export const schemaTypes = [
  archaeologicalSite,
  goddess,
  community,
  ancientMatriarchalSociety,
  publication,
  scholar
]

// 统一模型（备用方案）
// import entry from './entry'
// export const schemaTypes = [entry]
