import React, { useMemo } from 'react'
import { useNaviagtion, useAuthBloc } from '../../../hooks/inject'
import { Preference, PreferenceContext } from './PreferenceContext'
import { Header, Wrapper, AccountSection, Divider, NameItem, LogoutItem } from './View'

const PreferenceContent: React.FC = () => (
  <>
    <AccountSection>
      <Divider />
      <NameItem />
      <Divider />
      <LogoutItem />
    </AccountSection>
  </>
)

export const PreferenceScreen: React.FC = () => {
  const authBloc = useAuthBloc()
  const { navigate } = useNaviagtion()

  const preference = useMemo<Preference>(
    () => ({
      logout: () => {
        authBloc.signOut$.next()
        navigate('Auth')
      },
    }),
    [authBloc, navigate],
  )

  return (
    <>
      <Header />
      <PreferenceContext.Provider value={preference}>
        <Wrapper>
          <PreferenceContent />
        </Wrapper>
      </PreferenceContext.Provider>
    </>
  )
}
