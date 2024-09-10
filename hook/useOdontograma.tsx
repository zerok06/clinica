import { useEffect, useState } from 'react'

export interface MultiProps {
  name: string
  desc: string
  dienteUno: number
  dienteDos: number
  nomenclatura?: string | null
  canvas?: string | null
  code: string
  area:
    | 'permanente-superior'
    | 'permanente-inferior'
    | 'temporal-superior'
    | 'temporal-inferior'
}
export interface BiProps {
  name: string
  dienteUno: number
  dienteDos: number
  desc: string
  canvas?: string | null
  code: string
  area:
    | 'permanente-superior'
    | 'permanente-inferior'
    | 'temporal-superior'
    | 'temporal-inferior'
}

export interface MonoProps {
  name: string
  desc: string
  nomenclatura?: string | null
  canvas?: string | null
  base64: string
}
export interface Diente {
  id: string
  name: string
  code: number
  image: string
  diagnostico: Array<MonoProps>
}

export interface OdontogramaProps {
  permanentes: Array<Diente>
  temporales: Array<Diente>
}

const DEFAULT: OdontogramaProps = {
  permanentes: [
    {
      id: '61cda85b-ae03-4fd6-9e06-1ca2edcbfe76',
      name: 'asd',
      code: 18,
      image: '/assets/images/odontogram/dientes/1.svg',
      diagnostico: [],
    },
    {
      id: '5f60180d-8f27-4320-9bce-042a4157595f',
      name: 'asd',
      code: 17,
      image: '/assets/images/odontogram/dientes/1.svg',
      diagnostico: [],
    },
    {
      id: '81f159be-bd3a-4fbd-9125-a4630d36c439',
      name: 'asd',
      code: 16,
      image: '/assets/images/odontogram/dientes/1.svg',
      diagnostico: [],
    },
    {
      id: 'ab1c8343-a323-4757-9969-1e4f63534f03',
      name: 'asd',
      code: 15,
      image: '/assets/images/odontogram/dientes/2.svg',
      diagnostico: [],
    },
    {
      id: '8b68a66e-f83f-4b43-a6d1-95d4c02056d0',
      name: 'asd',
      code: 14,
      image: '/assets/images/odontogram/dientes/4.svg',
      diagnostico: [],
    },
    {
      id: 'a93c1088-fc75-406e-9379-616aa1c0e28a',
      name: 'asd',
      code: 13,
      image: '/assets/images/odontogram/dientes/5.svg',
      diagnostico: [],
    },
    {
      id: '0fd66816-ecda-4e88-9faa-26853dd00bfc',
      name: 'asd',
      code: 12,
      image: '/assets/images/odontogram/dientes/5.svg',
      diagnostico: [],
    },
    {
      id: 'c5ac7dee-528d-48d5-a565-833e6b04692d',
      name: 'asd',
      code: 11,
      image: '/assets/images/odontogram/dientes/5.svg',
      diagnostico: [],
    },
    {
      id: '1ba2cb96-eca1-4c96-9367-7eb1d0b12515',
      name: 'asd',
      code: 21,
      image: '/assets/images/odontogram/dientes/5.svg',
      diagnostico: [],
    },
    {
      id: '9f9166d2-c28a-4667-a1ba-7e8b46cdf3da',
      name: 'asd',
      code: 22,
      image: '/assets/images/odontogram/dientes/5.svg',
      diagnostico: [],
    },
    {
      id: '458d8ea1-3dc5-4f35-8d7c-385aa9872a8c',
      name: 'asd',
      code: 23,
      image: '/assets/images/odontogram/dientes/5.svg',
      diagnostico: [],
    },
    {
      id: '677bdb38-3276-4209-9d91-0c0355921461',
      name: 'asd',
      code: 24,
      image: '/assets/images/odontogram/dientes/3.svg',
      diagnostico: [],
    },
    {
      id: 'f112ae3e-1b5d-4d53-8aaa-3f1203808f91',
      name: 'asd',
      code: 25,
      image: '/assets/images/odontogram/dientes/2.svg',
      diagnostico: [],
    },
    {
      id: '55e01c3b-3858-455c-9347-d25d74893586',
      name: 'asd',
      code: 26,
      image: '/assets/images/odontogram/dientes/1.svg',
      diagnostico: [],
    },
    {
      id: '98a45fca-959b-429d-8a26-fcfa90a67815',
      name: 'asd',
      code: 27,
      image: '/assets/images/odontogram/dientes/1.svg',
      diagnostico: [],
    },
    {
      id: '83a5c046-dc3d-4da5-b407-edd7e1c4aeba',
      name: 'asd',
      code: 28,
      image: '/assets/images/odontogram/dientes/1.svg',
      diagnostico: [],
    },
    {
      id: 'a69f40c9-4e3f-44a9-b1df-8c72176ec232',
      name: 'asd',
      code: 48,
      image: '/assets/images/odontogram/dientes/R8.svg',
      diagnostico: [],
    },
    {
      id: '59f39b52-17c6-4600-b4e7-c3df855e6045',
      name: 'asd',
      code: 47,
      image: '/assets/images/odontogram/dientes/R8.svg',
      diagnostico: [],
    },
    {
      id: '72a90d29-0da9-48d0-a223-5ee7a81929e8',
      name: 'asd',
      code: 46,
      image: '/assets/images/odontogram/dientes/R1.svg',
      diagnostico: [],
    },
    {
      id: 'accea149-83b5-45a7-95ac-ba6e600bf9dd',
      name: 'asd',
      code: 45,
      image: '/assets/images/odontogram/dientes/R7.svg',
      diagnostico: [],
    },
    {
      id: 'cb5466dc-f3b4-4552-b2ae-06645c098254',
      name: 'asd',
      code: 44,
      image: '/assets/images/odontogram/dientes/R7.svg',
      diagnostico: [],
    },
    {
      id: 'f740ff09-bdc5-46f5-918d-68635d5a986f',
      name: 'asd',
      code: 43,
      image: '/assets/images/odontogram/dientes/R3.svg',
      diagnostico: [],
    },
    {
      id: 'fa932906-21c6-45a0-8def-342b447d229f',
      name: 'asd',
      code: 42,
      image: '/assets/images/odontogram/dientes/R3.svg',
      diagnostico: [],
    },
    {
      id: '527bfab4-8705-40e7-8209-8a03b4d8024f',
      name: 'asd',
      code: 41,
      image: '/assets/images/odontogram/dientes/R3.svg',
      diagnostico: [],
    },
    {
      id: '88870eac-1bee-466f-bbbb-a6a43ab3ec24',
      name: 'asd',
      code: 31,
      image: '/assets/images/odontogram/dientes/R3.svg',
      diagnostico: [],
    },
    {
      id: '4a901dfb-5307-46f4-b0b1-5e077f2efb8a',
      name: 'asd',
      code: 32,
      image: '/assets/images/odontogram/dientes/R3.svg',
      diagnostico: [],
    },
    {
      id: 'd45e727e-9b4d-4515-b24c-2edf5f6b93ab',
      name: 'asd',
      code: 33,
      image: '/assets/images/odontogram/dientes/R3.svg',
      diagnostico: [],
    },
    {
      id: '8bcded5b-3b78-4ea2-97ae-dcadc063fa6a',
      name: 'asd',
      code: 34,
      image: '/assets/images/odontogram/dientes/R7.svg',
      diagnostico: [],
    },
    {
      id: '03a9ca80-7f06-4826-8bba-2f66be9a0a46',
      name: 'asd',
      code: 35,
      image: '/assets/images/odontogram/dientes/R7.svg',
      diagnostico: [],
    },
    {
      id: '7f3cba48-7b25-4554-8ce4-f7315925ebcc',
      name: 'asd',
      code: 36,
      image: '/assets/images/odontogram/dientes/R2.svg',
      diagnostico: [],
    },
    {
      id: 'a9e0f9e2-3985-4f1c-953c-5a566717c1dd',
      name: 'asd',
      code: 37,
      image: '/assets/images/odontogram/dientes/R8.svg',
      diagnostico: [],
    },
    {
      id: 'd001427a-1995-45f4-8fbb-79753f44adc9',
      name: 'asd',
      code: 38,
      image: '/assets/images/odontogram/dientes/R8.svg',
      diagnostico: [],
    },
  ],
  temporales: [
    {
      id: '5cce5ad5-f3dd-4ad8-a520-3956ca682eea',
      name: 'asd',
      code: 55,
      image: '/assets/images/odontogram/dientes/1.svg',
      diagnostico: [],
    },
    {
      id: '0a57f79d-53e7-4169-84b8-47d4a17f1f94',
      name: 'asd',
      code: 54,
      image: '/assets/images/odontogram/dientes/1.svg',
      diagnostico: [],
    },
    {
      id: 'cf360c33-0bb7-4c0a-876e-3c14a78658bb',
      name: 'asd',
      code: 53,
      image: '/assets/images/odontogram/dientes/5.svg',
      diagnostico: [],
    },
    {
      id: '44c86a80-3fb8-4d9c-9720-be4b11dce38e',
      name: 'asd',
      code: 52,
      image: '/assets/images/odontogram/dientes/5.svg',
      diagnostico: [],
    },
    {
      id: '307dc381-6c67-48f5-8842-4c6d5b6795e9',
      name: 'asd',
      code: 51,
      image: '/assets/images/odontogram/dientes/5.svg',
      diagnostico: [],
    },
    {
      id: '58614914-886c-44d6-a87c-b6a320057854',
      name: 'asd',
      code: 61,
      image: '/assets/images/odontogram/dientes/5.svg',
      diagnostico: [],
    },
    {
      id: 'b667207f-e1d9-4063-a986-43ce562aaee9',
      name: 'asd',
      code: 62,
      image: '/assets/images/odontogram/dientes/5.svg',
      diagnostico: [],
    },
    {
      id: '50fa99da-5dec-413e-bb49-241e889d228f',
      name: 'asd',
      code: 63,
      image: '/assets/images/odontogram/dientes/5.svg',
      diagnostico: [],
    },
    {
      id: '94bd5459-4ab5-48cf-8955-de1fd1246905',
      name: 'asd',
      code: 64,
      image: '/assets/images/odontogram/dientes/1.svg',
      diagnostico: [],
    },
    {
      id: 'b52310a8-eff1-4feb-8687-9b3085dd6076',
      name: 'asd',
      code: 65,
      image: '/assets/images/odontogram/dientes/1.svg',
      diagnostico: [],
    },
    {
      id: '61c6e991-1283-4f64-829d-ef33790771cb',
      name: 'asd',
      code: 85,
      image: '/assets/images/odontogram/dientes/R1.svg',
      diagnostico: [],
    },
    {
      id: '5a380819-41dc-475b-b81e-120a638e7436',
      name: 'asd',
      code: 84,
      image: '/assets/images/odontogram/dientes/R8.svg',
      diagnostico: [],
    },
    {
      id: '1113813e-d2b3-4716-a73d-b182b7418e6c',
      name: 'asd',
      code: 83,
      image: '/assets/images/odontogram/dientes/R3.svg',
      diagnostico: [],
    },
    {
      id: '8a1d984d-1643-43b0-84a5-fac61c5378a9',
      name: 'asd',
      code: 82,
      image: '/assets/images/odontogram/dientes/R3.svg',
      diagnostico: [],
    },
    {
      id: 'f4b252b9-c1c2-49d5-bd1a-6f672028107f',
      name: 'asd',
      code: 81,
      image: '/assets/images/odontogram/dientes/R3.svg',
      diagnostico: [],
    },
    {
      id: '77ce0a31-e62d-4077-8a74-7dcee3d8f584',
      name: 'asd',
      code: 71,
      image: '/assets/images/odontogram/dientes/R3.svg',
      diagnostico: [],
    },
    {
      id: '26a8a7a9-a528-4c5a-ad62-b0ff7da77c2d',
      name: 'asd',
      code: 72,
      image: '/assets/images/odontogram/dientes/R3.svg',
      diagnostico: [],
    },
    {
      id: '6ba8a745-4f06-4a2a-897f-b79f8317bacf',
      name: 'asd',
      code: 73,
      image: '/assets/images/odontogram/dientes/R3.svg',
      diagnostico: [],
    },
    {
      id: 'd0d66b4a-65a0-4b5c-9110-2eacda656977',
      name: 'asd',
      code: 74,
      image: '/assets/images/odontogram/dientes/R8.svg',
      diagnostico: [],
    },
    {
      id: 'd1108f81-1271-4c59-a608-067bafbe46ff',
      name: 'asd',
      code: 75,
      image: '/assets/images/odontogram/dientes/R2.svg',
      diagnostico: [],
    },
  ],
}

const useOdontograma = () => {
  const [odontograma, setOdontograma] = useState<OdontogramaProps>(DEFAULT)

  useEffect(() => {
    console.log(odontograma)
  }, [odontograma])

  const addDiagnosticoMono = (props: MonoProps, code: number) => {
    setOdontograma(state => {
      if (state.temporales.some(item => item.code === code)) {
        const tmp = state.temporales.map(item => {
          if (item.code !== code) return item
          return {
            ...item,
            diagnostico: [...item.diagnostico, props],
          }
        })
        return { ...state, temporales: [...tmp] }
      }
      if (state.permanentes.some(item => item.code === code)) {
        const tmp = state.permanentes.map(item => {
          if (item.code !== code) return item
          return {
            ...item,
            diagnostico: [...item.diagnostico, props],
          }
        })
        return { ...state, permanentes: [...tmp] }
      }
      return state
    })
  }

  /* const addTratamientoBi = (props: BiProps) => {
    setOdontograma(state => ({
      ...state,
      diagnostico: {
        ...state.diagnostico,
        bi: [...state.diagnostico.bi, props],
      },
    }))
  }
  const addTratamientoMulti = (props: MultiProps) => {
    setOdontograma(state => ({
      ...state,
      diagnostico: {
        ...state.diagnostico,
        multi: [...state.diagnostico.multi, props],
      },
    }))
  } */

  return {
    odontograma,
    addDiagnosticoMono,
    /* addTratamientoBi,
    addTratamientoMulti, */
  }
}

export default useOdontograma
