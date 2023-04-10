import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Activity from '../src/activities/Activity.vue'

describe('activity', () => {
  it('should be render', () => {
    const wrapper = mount(Activity)
    expect(wrapper).toBeTruthy()
  })
})
