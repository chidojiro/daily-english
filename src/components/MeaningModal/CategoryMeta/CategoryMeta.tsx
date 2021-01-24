// import React from 'react';
// import { Space, Checkbox as AntdCheckbox } from 'antd';
// import { Field, FieldProps, FieldArray } from 'formik';
// import { Checkbox } from 'formik-antd';

// import { IVerbSubType, INounSubType, IMeaningType } from '../../../types';
// import { WordMeaningFormFields } from '../MeaningDialog';

// interface IMetaProperties<T> {
//   field: T;
//   label: string;
// }

// const verbMetaPropertiesCollection: IMetaProperties<IVerbMeta>[] = [
//   { field: 'transitive', label: 'Transitive' },
//   { field: 'intransitive', label: 'Intransitive' },
// ];

// const nounMetaPropertiesCollection: IMetaProperties<INounMeta>[] = [
//   { field: 'countable', label: 'Countable' },
//   { field: 'uncountable', label: 'Uncountable' },
// ];

// interface IProps {
//   category: IMeaningCategoryKeys;
// }

// export const CategoryMeta: React.FC<IProps> = ({ category }) => {
//   return (
//     <FieldArray name={WordMeaningFormFields.categoryMeta}>
//       {() => (
//         <Space>
//           {/**TODO: find a way to have antd styles for checkbox without this line */}
//           <AntdCheckbox style={{ display: 'none' }} />

//           {category === 'verb' &&
//             verbMetaPropertiesCollection.map(({ field, label }) => (
//               <Field name={`${WordMeaningFormFields.categoryMeta}.${field}`} key={field}>
//                 {({ field }: FieldProps) => <Checkbox {...field}>{label}</Checkbox>}
//               </Field>
//             ))}
//           {category === 'noun' &&
//             nounMetaPropertiesCollection.map(({ field, label }) => (
//               <Field name={`${WordMeaningFormFields.categoryMeta}.${field}`} key={field}>
//                 {({ field }: FieldProps) => <Checkbox {...field}>{label}</Checkbox>}
//               </Field>
//             ))}
//         </Space>
//       )}
//     </FieldArray>
//   );
// };
export default null;
